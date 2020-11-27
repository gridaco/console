import React, { useEffect, useState } from "react";
import PreviewEditor from "../preview-editor";
import Preview from "../canvas-preview";
import KeyEditor from "../key-editor";
import { NextRouter } from "next/router";
import { editorState } from "../../states/text-editor.state";
import { useRecoilValue, useRecoilState } from "recoil";
import { VanillaScreenTransport } from "@bridged.xyz/client-sdk/lib";
import { Resizable } from "re-resizable";

function Page(props: { router: NextRouter }) {
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
      <Preview
        onBackgroundClick={
          (e) => {
            console.log(e);
            setIsSelect(false);
          }
        }
        key={JSON.stringify(props.router.query)}
        screenConfig={screenConfig}
      />
      <Resizable
        style={{
          float: "right",
          padding: "65px",
          paddingBottom: "0",
          backgroundColor: "#F8F8F8",
        }}
        defaultSize={{
          width: "50%",
          height: "100vh",
        }}
        maxWidth="50%"
        minWidth="20%"
        minHeight="100vh"
      >
        {editorSwitch() ? <KeyEditor /> : <PreviewEditor />}
      </Resizable>

    </>
  );
};

export default Page;
