import React from "react";
import { Typography, FormControl, Select, MenuItem, TextField } from "@material-ui/core";
import EditableTextCard from "../../components/g11n/editable-text-card";

const KeyEditor = () => {
  return (
    <>
      <div>
        <div className="fileDepthTitle">
          <Typography variant="subtitle1">navigation1/</Typography>
        </div>
        <div className="textKey">
          <Typography variant="h2">"No key"</Typography>
          <Typography variant="h6">no key is set for selected layer</Typography>
        </div>
        <div>
          <TextField />
        </div>
      </div>
    </>
  );
};

export default KeyEditor;
