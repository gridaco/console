import React, { useEffect, useState } from 'react';
import { Stage, Layer, Text, Image, Group, Rect } from 'react-konva';
import useImage from 'use-image';
import { StorableLayerType } from '@base-sdk/base';
import { CGRectManifest, TextManifest, ColorFormat } from '@reflect-ui/core';
import {
  currentTextEditValueAtom,
  editorState,
} from '../../states/text-editor.state';
import { targetLayerIdAtom } from '../../states/preview-canvas.state';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { SelectableLayer } from '../../components/canvas/selectable-layer';
import { SceneLocalRepository } from '../../repositories';
import { converters } from '@reflect-ui/core';
import { convertBorderRadius } from '@reflect-ui/core/dist/converters/border-radius.convert';
import { convertOffsetToUniversal } from '@reflect-ui/core/dist/converters/offset.convert';
import {
  DesignGlobalizationRepositoriesStore,
  DesignGlobalizationRepository,
} from '@base-sdk/base/dist/g11n/repository';
import { currentEditorialLocaleAtom } from '../../states/editor-state';

const CanvasStage = (props: { sceneRepository?: SceneLocalRepository }) => {
  const { sceneRepository } = props;
  const scene = sceneRepository?.scene;
  const designGlobalizationRepository = DesignGlobalizationRepositoriesStore.find(
    scene?.id!
  );

  // const [locale,] = useRecoilState(currentEditorialLocaleAtom)
  // const translatedText = designGlobalizationRepository.fetchTranslation(id)

  const [isSelect, setIsSelect] = useRecoilState(editorState);
  const [targetLayerId, setTargetLayerId] = useRecoilState(targetLayerIdAtom);
  const [currentEditorialLocale] = useRecoilState(currentEditorialLocaleAtom);
  const [selectionLayerId, setSelectionLayerId] = useState<string>();

  // https://github.com/konvajs/react-konva/issues/533
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  if (scene && typeof window !== 'undefined') {
    console.log('sceneRepository', sceneRepository);
    console.log('layers', scene.layers);
    return (
      <div
        style={{
          margin: 'auto',
          position: 'relative',
          width: scene.width,
        }}
      >
        <Stage
          style={{
            position: 'relative',
            margin: 'auto',
          }}
          width={scene.width}
          height={scene.height}
          onClick={(e) => {
            const targetId = e.target.attrs.id;
            setTargetLayerId(targetId);
            /**
             * since the stage gets click event callback,
             * no regarding to its' child also have click event being called,
             * we should check the event id,
             * and compare to actual selection event comming from the layer itself.
             */
            if (selectionLayerId !== targetId) {
              setSelectionLayerId(targetId);
              setIsSelect(false);
            }
          }}
        >
          <RecoilBridge>
            <Layer key="main-layer">
              <StageBG width={scene.width} height={scene.height} fill="white" />
              {scene.layers
                .sort((a, b) => a.index - b.index)
                .map((e) => {
                  console.log(e);
                  if (e.type == StorableLayerType.text) {
                    console.log('text layer', e);
                    return (
                      <Group key={e.nodeId} x={e.x} y={e.y}>
                        <EditableG11nText
                          repository={designGlobalizationRepository}
                          locale={currentEditorialLocale}
                          key={e.nodeId}
                          id={e.nodeId}
                          selected={selectionLayerId === e.nodeId}
                          manifest={(e.data as any) as TextManifest}
                          width={e.width}
                          height={e.height}
                          onFocusChange={(id: string, focus: boolean) => {
                            console.log('focus change', id);
                            if (focus) {
                              setSelectionLayerId(id);
                              setIsSelect(true);
                            }
                          }}
                        />
                      </Group>
                    );
                  } else if (e.type == StorableLayerType.vanilla) {
                    return (
                      <Group key={e.nodeId} x={e.x} y={e.y}>
                        <StaticDesignImageDisplay
                          url={(e.data as any)?.src}
                          width={e.width}
                          height={e.height}
                        />
                      </Group>
                    );
                  } else if (e.type == StorableLayerType.rect) {
                    return (
                      <Group key={e.nodeId} x={e.x} y={e.y}>
                        <CGRect
                          key={e.nodeId}
                          data={e.data as CGRectManifest}
                        />
                      </Group>
                    );
                  }
                })}
            </Layer>
          </RecoilBridge>
        </Stage>
      </div>
    );
  } else {
    return <p>loading..</p>;
  }
};

export default CanvasStage;

function StageBG(props: { width: number; height: number; fill: string }) {
  return (
    <Rect width={props.width} height={props.height} fill={props.fill}></Rect>
  );
}

function CGRect(props: { data: CGRectManifest }) {
  const fill =
    props.data.fill !== undefined
      ? converters.color.convertReflectColorToUniversal(
          props.data.fill,
          ColorFormat.hex6
        )
      : undefined;
  const opacity = converters.color.fetchColrOpacity(props.data.fill);
  const borderRadius =
    props.data.borderRadius !== undefined
      ? convertBorderRadius(props.data.borderRadius)
      : undefined;
  const shadow = props.data.shadow;
  console.log('fill', fill);
  return (
    // <SelectableLayer>
    <Rect
      opacit={opacity}
      fill={fill}
      shadowColor={converters.color.convertReflectColorToUniversal(
        shadow?.color,
        ColorFormat.hex6
      )}
      shadowOpacity={converters.color.fetchColrOpacity(shadow?.color)}
      shadowBlur={shadow?.blurRadius}
      shadowOffset={convertOffsetToUniversal(shadow?.offset)}
      cornerRadius={borderRadius}
      width={props.data.width}
      height={props.data.height}
    />
    // </SelectableLayer>
  );
}

function StaticDesignImageDisplay(props: {
  url: string;
  width: number;
  height: number;
  x?: number;
  y?: number;
}) {
  const [image] = useImage(props.url);
  return (
    <SelectableLayer {...props}>
      <Image
        image={image}
        width={props.width}
        height={props.height}
        x={props.x}
        y={props.y}
      />
    </SelectableLayer>
  );
}

let chachedEditingText: string | undefined; // this must be contained inside atom value
function EditableG11nText(props: {
  id: string;
  locale: string;
  selected: boolean;
  manifest: TextManifest;
  overrideText?: string;
  width: number;
  height: number;
  repository: DesignGlobalizationRepository;
  onFocusChange: (id: string, focus: boolean) => void;
}) {
  let defaulttext = props.manifest.data as string;
  const [translatedText, setTranslatedText] = useState<string>(defaulttext);

  // useEffect(() => {
  // }, [])
  useEffect(() => {
    props.repository
      .fetchLocaleTranslation(props.id, props.locale)
      .then((t) => {
        if (t) {
          setTranslatedText(t);
        }
      });
  }, [props.selected, props.locale]);

  const [currentEditTextValue] = useRecoilState(currentTextEditValueAtom);
  let editingText: string | undefined;
  if (props.selected) {
    console.log('currentEditTextValue', currentEditTextValue);
    // const currentEditTextValue = useRecoilValue(currentTextValueSelector)
    if (currentEditTextValue !== undefined) {
      if (currentEditTextValue !== chachedEditingText) {
        editingText = currentEditTextValue;
        chachedEditingText = currentEditTextValue;
      }
    }
  }

  const displayText = editingText ?? translatedText ?? defaulttext;

  // const [translated, setTranslated] = useState<string>(text)

  return (
    <SelectableLayer {...props}>
      <Text
        key={props.id}
        id={props.id}
        text={displayText}
        align={props.manifest.textAlign as any}
        verticalAlign={props.manifest.textAlignVertical as any}
        fontSize={(props.manifest.style as any).fontSize as any}
        ellipsis={true}
        fill={converters.color.convertReflectColorToUniversal(
          (props.manifest.style as any).color,
          ColorFormat.hex6
        )}
        fontFamily="'Arial'" //{`"${props.text.style.fontFamily}"`}
        width={props.width}
        height={props.height}
      />
    </SelectableLayer>
  );
}
