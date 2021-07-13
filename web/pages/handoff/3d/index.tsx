import React from 'react';
import dynamic from 'next/dynamic';

const ModelViewer_withnossr = dynamic(
  () => import('@app/handoff/handoff-3d/model-viewer'),
  {
    ssr: false,
  }
);

export default function Handoff3DPage() {
  return (
    <>
      <ModelViewer_withnossr autoRotate cameraControls />
    </>
  );
}
