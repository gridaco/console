import React from 'react';
import '@google/model-viewer';

const DEMO_MODEL_3D_SIMPLE = {
  astronaut:
    'https://example-resources.s3.us-west-1.amazonaws.com/3d-simple/Astronaut.glb',
};

interface ModelViewerProps {
  src?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
}

export function ModelViewer({
  src = DEMO_MODEL_3D_SIMPLE.astronaut,
  autoRotate,
  cameraControls,
}: ModelViewerProps) {
  return (
    //@ts-ignore
    <model-viewer
      src={src}
      auto-rotate={autoRotate}
      camera-controls={cameraControls}
    />
  );
}
