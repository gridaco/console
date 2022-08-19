import React from "react";
import "@google/model-viewer/dist/model-viewer";

const DEMO_MODEL_3D_SIMPLE = {
  astronaut:
    "https://example-resources.s3.us-west-1.amazonaws.com/3d-simple/Astronaut.glb",
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
  if (typeof window !== "undefined") {
    return (
      // @ts-ignore
      <model-viewer
        class="model-viewer"
        src={src}
        width={`100%`}
        height={`100%`}
        auto-rotate={autoRotate}
        camera-controls={cameraControls}
      />
    );
  }

  return <>Loading..</>;
}
