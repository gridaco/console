import React from "react";
import { Typography, TextField } from "@material-ui/core";
import { targetLayerSelector } from "../../states/preview-canvas.state"
import { useRecoilState, useRecoilValue } from "recoil";
const KeyEditor = () => {

  const targetLayer = useRecoilValue(targetLayerSelector)

  return (
    <>
      <div>
        <div className="fileDepthTitle">
          <Typography variant="subtitle1">navigation1/</Typography>
        </div>
        <div className="textKey">
          <Typography variant="h2">"No key"</Typography>
          <Typography variant="h6">no key is set for selected layer "{targetLayer?.data.text}"</Typography>
        </div>
        <div>
          <TextField />
        </div>
      </div>
    </>
  );
};

export default KeyEditor;
