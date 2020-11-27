import { VanillaScreenTransport } from "@bridged.xyz/client-sdk/lib";
import React, { useState } from "react";
import { CanvasBackground } from "../../components/canvas/background";
import Stage from "../../components/canvas/stage"
import { usePinch } from 'react-use-gesture'
import { motion } from "framer-motion"

export default function (props: {
  onBackgroundClick: (e: any) => void
  screenConfig?: VanillaScreenTransport
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
    <Stage screenConfig={props.screenConfig} />
    {/* </motion.div> */}
  </div>
}