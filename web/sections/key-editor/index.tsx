import React from "react";
import { Typography, TextField } from "@material-ui/core";
import { targetLayerSelector } from "../../states/preview-canvas.state"
import { useRecoilState, useRecoilValue } from "recoil";
import { StorableLayerType } from "@bridged.xyz/client-sdk/lib";
import { TextManifest } from "@reflect.bridged.xyz/core";
const KeyEditor = () => {

  const targetLayer = useRecoilValue(targetLayerSelector)
  const textValue = targetLayer?.type === StorableLayerType.text ? (targetLayer?.data as TextManifest).text : 'this is not a text'

  return (
    <>
      <div>
        <div className="fileDepthTitle">
          <Typography variant="subtitle1">navigation1/</Typography>
        </div>
        <div className="textKey">
          <Typography variant="h2">"No key"</Typography>
          <Typography variant="h6">no key is set for selected layer "{textValue}"</Typography>
        </div>
        <div>
          <TextField />
        </div>
      </div>
    </>
  );
};

export default KeyEditor;
