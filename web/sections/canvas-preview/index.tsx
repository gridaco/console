import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Text, Image, Group } from "react-konva";
import useImage from "use-image";
import { VanillaScreenTransport } from "@bridged.xyz/client-sdk";
import { TextManifest } from "@reflect.bridged.xyz/core/lib";
import { useRouter, NextRouter } from "next/router";
import { editorState } from "../../states/text-editor.state";
import { useRecoilState } from "recoil";


export default function (props: {
  screenConfig?: VanillaScreenTransport
}) {
  const { screenConfig } = props
  const [isSelect, setIsSelect] = useRecoilState(editorState);
  const [selection, setSelection] = useState<string>();


  if (screenConfig && typeof window !== "undefined") {
    return (
      <Stage
        width={screenConfig.width}
        height={screenConfig.height}
        onClick={(e) => {
          const targetId = e.target.attrs.id;
          console.log("click event on stage", targetId,);
          if (selection !== targetId) {
            setSelection(targetId)
            setIsSelect(false);
          }
        }}
      >
        <Layer>
          {screenConfig.elements
            .sort((a, b) => a.index - b.index)
            .map((e) => {
              if (e.type == "text") {
                return (
                  <Group key={e.id} x={e.x} y={e.y}>
                    <EditableG11nText
                      id={e.id}
                      selected={selection === e.id}
                      text={e.data as any}
                      width={e.width}
                      height={e.height}
                      onFocusChange={(
                        id: string,
                        focus: boolean
                      ) => {
                        if (focus) {
                          setSelection(id)
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
    <Image
      image={image}
      width={props.width}
      height={props.height}
      x={props.x}
      y={props.y}
    />
  );
};

function EditableG11nText(props: {
  id: string;
  selected: boolean;
  text: TextManifest;
  width: number;
  height: number;
  onFocusChange: (id: string, focus: boolean) => void;
}) {
  if (props.selected) {
    console.log('selected', props.id, props.selected)
  }
  // const [focused, setFocused] = useState<boolean>(false);
  // const [editing, setEditing] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(props.text.text);
  const [hover, setHover] = useState<boolean>();
  // const [textX, setTextX] = useState<number>(0);
  // const [textY, setTextY] = useState<number>(0);

  const handleClick = (e: any) => {
    // setFocused(true);
    // props.onFocusChange(props.id, true);
    props.onFocusChange(props.id, true);

    console.log(`${props.id} clicked, text id is ${props.id}`);
  };

  const handleDoubleClick = (e: any) => {
    props.onFocusChange(props.id, true);
    // setEditing(true);
  };

  const handleOutFocus = (e: any) => {
    setHover(false)
  };
  const handleInFocus = (e: any) => {
    setHover(true)
  };

  const handleTextEdit = (e: any) => {
    console.log("changed", e.target.value);
    setTextValue(e.target.value);
  };

  return (
    <Group>
      {/* selection indicator */}
      <Rect
        width={props.width}
        height={props.height}
        stroke={'black'}
        strokeWidth={props.selected ? 2 : 0} />
      {/* hover indicator */}
      <Rect
        width={props.width}
        height={props.height}
        stroke={'blue'}
        strokeWidth={hover ? 1 : 0} />
      <Text
        id={props.id}
        text={textValue}
        align={props.text.textAlign}
        verticalAlign={props.text.textAlignVertical}
        fontSize={props.text.style.fontSize}
        fontFamily="'Arial'" //{`"${props.text.style.fontFamily}"`}
        width={props.width}
        height={props.height}
        onMouseLeave={handleOutFocus}
        onMouseEnter={handleInFocus}
        // ondblclick={handleDoubleClick}
        onClick={handleClick}
      />
    </Group>
  );
}
