import React from "react";
import { Typography, FormControl, Select, MenuItem } from "@material-ui/core";
import EditableTextCard from "../../components/g11n/editable-text-card";

const KeyEditor = () => {
  return (
    <>
      <div>
        <div className="fileDepthTitle">
          <Typography variant="subtitle1">navigation1/</Typography>
        </div>
        <div className="textKey">
          <Typography variant="h2">/main/home/row1/subtitle</Typography>
        </div>
      </div>
    </>
  );
};

export default KeyEditor;
