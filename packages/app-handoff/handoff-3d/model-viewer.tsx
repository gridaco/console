import React from 'react';
import '@google/model-viewer/dist/model-viewer';

const DEMO_MODEL_3D_SIMPLE = {
  astronaut:
    'https://example-resources.s3.us-west-1.amazonaws.com/3d-simple/Astronaut.glb',
};

interface ModelViewerProps {
  src?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
}

export default function ModelViewer({
  src = DEMO_MODEL_3D_SIMPLE.astronaut,
  autoRotate,
  cameraControls,
}: ModelViewerProps) {
  if (process.browser) {
    return (
      <div style={{ width: '100%' }}>
        {/* @ts-ignore */}
        <model-viewer
          src={src}
          width={`500px`}
          height={`500px`}
          auto-rotate={autoRotate}
          camera-controls={cameraControls}
        />
      </div>
    );
  }

  return <>Loading..</>;
}
