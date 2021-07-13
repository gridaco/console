import React from 'react';
import dynamic from 'next/dynamic';
import { styled } from '@linaria/react';

const ModelViewer_withnossr = dynamic(
  () => import('@app/handoff/handoff-3d/model-viewer'),
  {
    ssr: false,
  }
);

export default function Handoff3DPage() {
  return (
    <PageRoot>
      <ModelViewerWrap>
        <ModelViewer_withnossr autoRotate cameraControls />
      </ModelViewerWrap>
    </PageRoot>
  );
}

const PageRoot = styled.div`
  height: 100vh;
`;

const ModelViewerWrap = styled.div`
  height: 100%;
  .model-viewer {
    width: 100%;
    height: 100%;
  }
`;
