import React from "react";
import SceneKeyEditor from "../scene-key-editor";
import Preview from "../canvas-preview";
import SingleKeyEditor from "../key-editor";
import { editorState } from "../../states/text-editor.state";
import { useRecoilValue, useRecoilState } from "recoil";
import { Resizable } from "re-resizable";
import { SceneLocalRepository, SceneRepositoryStore } from "../../repositories";


type EditorMode = "translation" | "preview" | "prototype" | "*"
interface EditorProps {
  mode: EditorMode
  projectId?: string
  sceneId: string
}

function Editor(props: EditorProps) {
  const [isSelect, setIsSelect] = useRecoilState(editorState);

  const editorSwitch = () => {
    const isFocus = useRecoilValue(editorState);
    return isFocus;
  };


  return (
    <>
      <Preview
        onBackgroundClick={
          (e) => {
            console.log(e);
            setIsSelect(false);
          }
        }
        sceneRepository={SceneRepositoryStore.find(props.sceneId)}
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
        {editorSwitch() ? <SingleKeyEditor /> : <SceneKeyEditor />}
      </Resizable>

    </>
  );
};

export default Editor;
