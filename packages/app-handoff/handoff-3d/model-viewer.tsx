import React from 'react';
import Head from 'next/head';
// import '@google/model-viewer/dist/model-viewer';

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
  if (process.browser) {
    return (
      <>
        <Head>
          <script
            type="module"
            src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          ></script>
          <script
            noModule
            src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"
          ></script>
        </Head>
        {/* @ts-ignore */}
        <model-viewer
          src={src}
          auto-rotate={autoRotate}
          camera-controls={cameraControls}
        />
      </>
    );
  }

  return <>Loading..</>;
}
