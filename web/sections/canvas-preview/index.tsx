import React, { useState } from 'react';
import { usePinch } from 'react-use-gesture';
import { motion } from 'framer-motion';
import { styled } from '@linaria/react';

import Background from '../../components/canvas/background';
import CanvasStage from '../../components/canvas/stage';
import { SceneLocalRepository } from '../../repositories';

export default function CanvasPreview(props: {
  onBackgroundClick: (e: any) => void;
  sceneRepository?: SceneLocalRepository;
}) {
  // 1. TODO
  // implement zooming feature (reference: zeplin)

  const [zoom, setZoom] = useState<number>(1.0);

  const bind = usePinch((state) => {
    // console.log(state)
    // setZoom(zoom + 0.01)
  });

  return (
    <PreviewWrapper {...bind()}>
      <Background
        onClick={props.onBackgroundClick}
        style={{ overflow: 'scroll', paddingTop: 54, paddingBottom: 54 }}
      >
        {/* <motion.div animate={{ zoom: zoom }}> */}
        <div
          style={{
            margin: 'auto',
          }}
        >
          <CanvasStage sceneRepository={props.sceneRepository} />
        </div>
        {/* </motion.div> */}
      </Background>
    </PreviewWrapper>
  );
}

const PreviewWrapper = styled.div`
  width: 50%;
  display: flex;
  height: 100vh;
`;
