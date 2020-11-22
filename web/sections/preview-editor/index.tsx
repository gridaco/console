import React, { useState } from "react";
import { Typography, FormControl, Select, MenuItem } from "@material-ui/core";
import EditableTextCard from "../../components/g11n/editable-text-card";

const PreviewEditor = (props?: {}) => {
  const [tmpLang, setTmpLang] = useState("English (default)");

  const handleLangOnChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setTmpLang(e.target.value as string);
  };
  return (
    <>
      <div>
        <div className="fileDepthTitle">
          <Typography variant="subtitle1">navigation1/</Typography>
        </div>
        <div className="screenName">
          <Typography variant="h2">Screen Name</Typography>
        </div>
        <div>
          <Typography
            variant="subtitle1"
            align="left"
            style={{ float: "left" }}
          >
            12 keys
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            style={{ float: "left" }}
          >
            32 Texts
          </Typography>
          <Typography variant="subtitle1" align="left">
            12 Components
          </Typography>
        </div>
        <div style={{ marginTop: "10px", marginBottom: "40px" }}>
          <FormControl>
            <Select value={tmpLang} onChange={handleLangOnChange}>
              <MenuItem value="Ko">Ko</MenuItem>
              <MenuItem value="English (default)">English</MenuItem>
              <MenuItem value="JP">JP</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <EditableTextCard />
          <EditableTextCard />
          <EditableTextCard />
          <EditableTextCard />
          <EditableTextCard />
          <EditableTextCard />
        </div>
      </div>
    </>
  );
};

export default PreviewEditor;
