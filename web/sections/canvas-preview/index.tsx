import React, { useState } from "react";
import { Stage, Layer, Rect, Text, Image, Group } from "react-konva";
import useImage from "use-image";
import { VanillaScreenTransport } from "@bridged.xyz/client-sdk";
import { TextManifest } from "@reflect.bridged.xyz/core/lib";
import { useRouter, NextRouter } from "next/router";
import { editorState } from "../../recoil";
import { useRecoilState } from "recoil";

interface Props {
  //Your component props
  router: NextRouter;
}

interface State {
  screenConfig?: VanillaScreenTransport;
}

export default function (props: Props) {
  const [isSelect, setIsSelect] = useRecoilState(editorState);
  const [screenConfig, setScreenConfig] = useState<VanillaScreenTransport>();
  const query = props.router.query;
  const url: string = query.url as string;
  let targetSelectedId: number;

  if (url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setScreenConfig(data as VanillaScreenTransport);
      });
  }

  if (screenConfig && typeof window !== "undefined") {
    return (
      <Stage
        width={screenConfig.width}
        height={screenConfig.height}
        onClick={(e) => {
          console.log("clicked", e.target._id);
          const targetId = e.target._id;
          if (targetSelectedId !== targetId) {
            setIsSelect(false);
          }
        }}
        style={{ zIndex: 999 }}
      >
        {screenConfig.elements
          .sort((a, b) => a.index - b.index)
          .map((e) => {
            if (e.type == "text") {
              return (
                <Layer key={e.id} x={e.x} y={e.y}>
                  <EditableG11nText
                    id={e.id}
                    text={e.src as any}
                    width={e.width}
                    height={e.height}
                    onFocusChange={(
                      nodeId: number,
                      id: string,
                      focus: boolean
                    ) => {
                      if (focus) {
                        targetSelectedId = nodeId;
                        setIsSelect(true);
                      }
                    }}
                  />
                </Layer>
              );
            } else {
              return (
                <Layer key={e.id} x={e.x} y={e.y}>
                  <StaticDesignImageDisplay
                    url={(e.src as any).src}
                    width={e.width}
                    height={e.height}
                  />
                </Layer>
              );
            }
          })}
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
  text: TextManifest;
  width: number;
  height: number;
  onFocusChange: (nodeId: number, id: string, focus: boolean) => void;
}) {
  // const [focused, setFocused] = useState<boolean>(false);
  // const [editing, setEditing] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(props.text.text);
  // const [textX, setTextX] = useState<number>(0);
  // const [textY, setTextY] = useState<number>(0);

  const handleClick = (e: any) => {
    // setFocused(true);
    // props.onFocusChange(props.id, true);
    props.onFocusChange(e.target._id, props.id, true);

    console.log(`${props.id} clicked`);
  };

  const handleDoubleClick = (e: any) => {
    props.onFocusChange(e.target._id, props.id, true);
    // setEditing(true);
  };

  const handleOutFocus = (e: any) => {
    props.onFocusChange(e.target._id, props.id, false);
  };

  const handleTextEdit = (e: any) => {
    console.log("changed", e.target.value);
    setTextValue(e.target.value);
  };

  return (
    <Text
      text={textValue}
      align={props.text.textAlign}
      verticalAlign={props.text.textAlignVertical}
      fontSize={props.text.style.fontSize}
      fontFamily="'Arial'" //{`"${props.text.style.fontFamily}"`}
      width={props.width}
      height={props.height}
      onMouseLeave={handleOutFocus}
      // ondblclick={handleDoubleClick}
      onClick={handleClick}
    />
  );
}
