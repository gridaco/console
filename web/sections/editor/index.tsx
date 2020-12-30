import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Resizable } from 're-resizable';
import { styled } from '@linaria/react';
import { DesignGlobalizationRepositoriesStore } from '@bridged.xyz/client-sdk/lib/g11n/repository';

import { targetLayerSelector } from '../../states';
import { editorState } from '../../states/text-editor.state';
import SceneKeyEditor from '../scene-key-editor';
import CanvasPreview from '../canvas-preview';
import SingleKeyEditor from '../key-editor';
import { SceneLocalRepository, SceneRepositoryStore } from '../../repositories';

type EditorMode = 'translation' | 'preview' | 'prototype' | '*';

interface EditorProps {
  mode: EditorMode;
  projectId?: string;
  sceneId: string;
}

function Editor(props: EditorProps) {
  const [isSelect, setIsSelect] = useRecoilState(editorState);
  const targetLayer = useRecoilValue(targetLayerSelector);

  const editorSwitch = (): boolean => {
    return targetLayer !== undefined;
  };

  const repository = DesignGlobalizationRepositoriesStore.find(props.sceneId);

  return (
    <Wrapper>
      <CanvasPreview
        onBackgroundClick={(e) => {
          console.log(e);
          setIsSelect(false);
        }}
        sceneRepository={SceneRepositoryStore.find(props.sceneId)}
      />
      <Resizable
        style={{
          paddingBottom: 0,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
        defaultSize={{
          width: '50%',
          height: 'calc(100vh - 56px)',
        }}
        maxWidth="50%"
        minWidth="20%"
        maxHeight="calc(100vh - 56px)"
      >
        {editorSwitch() ? (
          <SingleKeyEditor key={targetLayer?.nodeId} repository={repository} />
        ) : (
          <SceneKeyEditor repository={repository} />
        )}
      </Resizable>
    </Wrapper>
  );
}

export default Editor;

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  margin-top: 56px;
`;
