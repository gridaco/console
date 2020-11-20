import React, { Component, useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Image, Group } from "react-konva";
import useImage from "use-image";
import { VanillaScreenTransport } from "@bridged.xyz/client-sdk";
import { TextManifest } from "@reflect.bridged.xyz/core/lib";
import { useRouter, NextRouter } from "next/router";

interface Props {
  //Your component props
  router: NextRouter;
}

interface State {
  screenConfig?: VanillaScreenTransport;
}

export default class extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      screenConfig: undefined,
    };
  }

  componentDidMount() {
    const query = this.props.router.query;
    const url: string = query.url as string;

    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState(() => {
            return {
              screenConfig: data as VanillaScreenTransport,
            };
          });
        });
    }
  }

  render() {
    if (this.state.screenConfig && typeof window !== "undefined") {
      return (
        <Stage
          width={this.state.screenConfig.width}
          height={this.state.screenConfig.height}
        >
          {this.state.screenConfig.elements
            .sort((a, b) => a.index - b.index)
            .map((e) => {
              if (e.type == "text") {
                return (
                  <Layer key={e.id} x={e.x} y={e.y}>
                    <EditableG11nText
                      text={e.src as any}
                      width={e.width}
                      height={e.height}
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
  text: TextManifest;
  width: number;
  height: number;
}) {
  const [focused, setFocused] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(props.text.text);
  const [textX, setTextX] = useState<number>(0);
  const [textY, setTextY] = useState<number>(0);
  const [tmpState, setTmpState] = useState<boolean>(false);
  /**
             *    <textarea
                    value={textValue}
                    style={{
                        display: editing ? 'block' : 'none',
                        position: 'absolute',
                        top: textY + 'px',
                        left: textX + 'px'
                    }}
                    onChange={handleTextEdit}
                    onKeyDown={handleTextareaKeyDown}
                />
             */

  const handleClick = () => {
    setFocused(true);
  };

  const handleDoubleClick = (e: any) => {
    setEditing(true);

    const absPos = e.target.getAbsolutePosition();
    const ta = document.createElement("textarea");
    console.log(`el created`, ta);
    document.body.appendChild(ta);

    ta.value = textValue;
    ta.style.position = "absolute";
    ta.style.display = editing ? "block" : "none";
    ta.style.top = absPos.y + "px";
    ta.style.left = absPos.x + 200 + "px";
    ta.style.width = 200 + "px";
    ta.onkeydown = handleTextareaKeyDown;
    ta.onkeyup = handleTextEdit;

    // setTextX(absPos.x)
    // setTextY(absPos.y)
    setTmpState(true);
  };

  const handleTextEdit = (e: any) => {
    console.log("changed", e.target.value);
    setTextValue(e.target.value);
  };

  const handleTextareaKeyDown = (e: any) => {
    // return or enter
    if (e.keyCode === 13) {
      console.log("exiting edit");
      setEditing(false);
      document.removeChild(e.target);
    }
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
      onMouseLeave={() => {
        setFocused(false);
      }}
      ondblclick={handleDoubleClick}
      onClick={handleClick}
    />
  );
}
