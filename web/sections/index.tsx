import React, { useEffect, useState } from "react";
import PreviewEditor from "./preview-editor";
import Preview from "./canvas-preview";
import KeyEditor from "./key-editor";
import { NextRouter } from "next/router";
import { editorState } from "../recoil";
import { useRecoilValue, useRecoilState } from "recoil";
import { VanillaScreenTransport } from "@bridged.xyz/client-sdk";

const page = (props: { router: NextRouter }) => {
  const [isSelect, setIsSelect] = useRecoilState(editorState);

  const editorSwitch = () => {
    const isFocus = useRecoilValue(editorState);
    return isFocus;
  };

  const [screenConfig, setScreenConfig] = useState<VanillaScreenTransport>();

  const query = props.router.query;
  const url: string = query.url as string;

  useEffect(() => {
    if (url && !screenConfig) {
      console.log('fetching')
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setScreenConfig(data as VanillaScreenTransport);
        });
    }
  })


  return (
    <>
      <div
        style={{
          width: "50%",
          float: "left",
          height: "100vh",
          padding: "65px",
          paddingBottom: "0",
        }}
      >
        <div
          style={{
            width: "50vw",
            height: "100vw",
            position: "absolute",
            top: "0",
            float: "left",
            paddingBottom: "0",
          }}
          onClick={(e) => {
            console.log(e);
            setIsSelect(false);
          }}
        ></div>
        <Preview
          key={JSON.stringify(props.router.query)}
          screenConfig={screenConfig}
        />
      </div>
      <div
        style={{
          width: "50%",
          float: "left",
          height: "100vh",
          padding: "65px",
          paddingBottom: "0",
          backgroundColor: "#F8F8F8",
        }}
      >
        {editorSwitch() ? <KeyEditor /> : <PreviewEditor />}
      </div>
    </>
  );
};

export default page;
