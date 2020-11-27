import React, { useState } from "react";
import { Stage, Layer, Rect, Text, Image, Group } from "react-konva";
import useImage from "use-image";
import { VanillaScreenTransport, TransportLayer } from "@bridged.xyz/client-sdk/lib";
import { TextManifest } from "@reflect.bridged.xyz/core/lib";
import { editorState } from "../../states/text-editor.state";
import { targetLayerIdAtom } from "../../states/preview-canvas.state"
import { useRecoilState } from "recoil";
import { SelectableLayer } from "../../components/canvas/selectable-layer";
import { SceneLocalRepository } from "../../repositories";


export default function (props: {
    sceneRepository?: SceneLocalRepository
}) {
    const { sceneRepository } = props
    const scene = sceneRepository?.scene;
    const [isSelect, setIsSelect] = useRecoilState(editorState);
    const [targetLayerId, setTargetLayerId] = useRecoilState(targetLayerIdAtom);
    const [selectionLayerId, setSelectionLayerId] = useState<string>();


    if (scene && typeof window !== "undefined") {
        return (
            <div
                style={{
                    backgroundColor: "#FFFFFF"
                }}>
                <Stage
                    width={scene.width}
                    height={scene.height}
                    onClick={(e) => {
                        const targetId = e.target.attrs.id;
                        setTargetLayerId(targetId)

                        /**
                         * since the stage gets click event callback,
                         * no regarding to its' child also have click event being called,
                         * we should check the event id,
                         * and compare to actual selection event comming from the layer itself.
                         */
                        if (selectionLayerId !== targetId) {
                            setSelectionLayerId(targetId)
                            setIsSelect(false);
                        }
                    }}
                >
                    <Layer>
                        {scene.elements
                            .sort((a, b) => a.index - b.index)
                            .map((e) => {
                                if (e.type == "text") {
                                    return (
                                        <Group key={e.id} x={e.x} y={e.y}>
                                            <EditableG11nText
                                                id={e.id}
                                                selected={selectionLayerId === e.id}
                                                manifest={e.data as any}
                                                width={e.width}
                                                height={e.height}
                                                onFocusChange={(
                                                    id: string,
                                                    focus: boolean
                                                ) => {
                                                    console.log('focus change', id)
                                                    if (focus) {
                                                        setSelectionLayerId(id)
                                                        setIsSelect(true);
                                                    }
                                                }}
                                            />
                                        </Group>
                                    );
                                } else {
                                    return (
                                        <Group key={e.id} x={e.x} y={e.y}>
                                            <StaticDesignImageDisplay
                                                url={(e.data as any).src}
                                                width={e.width}
                                                height={e.height}
                                            />
                                        </Group>
                                    );
                                }
                            })}
                    </Layer>
                </Stage>
            </div>

        );
    } else {
        return <p>loading..</p>;
    }
}

// the first very simple and recommended way:
const StaticDesignImageDisplay = (props: {
    url: string;
    width: number;
    height: number;
    x?: number;
    y?: number;
}) => {
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
};


function EditableG11nText(props: {
    id: string;
    selected: boolean;
    manifest: TextManifest;
    width: number;
    height: number;
    onFocusChange: (id: string, focus: boolean) => void;
}) {
    return (
        <SelectableLayer {...props}>
            <Text
                key={props.id}
                id={props.id}
                text={props.manifest.text}
                align={props.manifest.textAlign}
                verticalAlign={props.manifest.textAlignVertical}
                fontSize={props.manifest.style.fontSize}
                // TODO implement font loading
                fontFamily="'Arial'" //{`"${props.text.style.fontFamily}"`}
                width={props.width}
                height={props.height}
            />
        </SelectableLayer>
    );
}
