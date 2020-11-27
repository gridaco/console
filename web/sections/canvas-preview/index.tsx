import { VanillaScreenTransport } from "@bridged.xyz/client-sdk/lib";
import React, { useState } from "react";
import { CanvasBackground } from "../../components/canvas/background";
import Stage from "../../components/canvas/stage"
import { usePinch } from 'react-use-gesture'
import { motion } from "framer-motion"
import { SceneLocalRepository } from "../../repositories";

export default function (props: {
  onBackgroundClick: (e: any) => void
  sceneRepository?: SceneLocalRepository
}) {

  // 1. TODO
  // implement zooming feature (reference: zeplin)

  const [zoom, setZoom] = useState<number>(1.0)

  const bind = usePinch(state => {
    // console.log(state)
    // setZoom(zoom + 0.01)
  })

  return <div {...bind()} style={{
    width: "50%",
    float: "left",
    height: "100vh",
    overflow: "scroll"
  }}>
    <CanvasBackground onClick={props.onBackgroundClick} />
    {/* <motion.div animate={{ zoom: zoom }}> */}
    <Stage sceneRepository={props.sceneRepository} />
    {/* </motion.div> */}
  </div>
}