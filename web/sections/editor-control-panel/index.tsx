import React, { useEffect, useState } from "react";
import PreviewEditor from "../preview-editor";
import Preview from "../canvas-preview";
import KeyEditor from "../key-editor";
import { NextRouter } from "next/router";
import { editorState } from "../../states/text-editor.state";
import { useRecoilValue, useRecoilState } from "recoil";
import { VanillaScreenTransport } from "@bridged.xyz/client-sdk/lib";
import { Resizable } from "re-resizable";
import { SceneLocalRepository } from "../../repositories";

function Page(props: { router: NextRouter }) {
  const [isSelect, setIsSelect] = useRecoilState(editorState);

  const editorSwitch = () => {
    const isFocus = useRecoilValue(editorState);
    return isFocus;
  };

  const [sceneRepository, setScreenRepository] = useState<SceneLocalRepository>();

  const query = props.router.query;
  const url: string = query.url as string;

  useEffect(() => {
    if (url && !sceneRepository) {
      console.log('fetching scene data')
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const sceneRepository = new SceneLocalRepository(data as VanillaScreenTransport)
          setScreenRepository(sceneRepository);
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
        sceneRepository={sceneRepository}
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
