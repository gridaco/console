import React, { useState } from "react";
import { Typography, FormControl, Select, MenuItem } from "@material-ui/core";
import EditableTextCard from "../../components/g11n/editable-text-card";
import { currentEditorialLocaleAtom } from "../../states/editor-state"
import { useRecoilState } from "recoil";

const SceneKeyEditor = (props?: {}) => {
  const [locale, setLocale] = useRecoilState(currentEditorialLocaleAtom);
  const handleLocaleSelectChange = (e: any) => {
    setLocale(e.target.value as string);
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
            <Select value={locale} onChange={handleLocaleSelectChange}>
              <MenuItem value="ko">Ko</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ja">JP</MenuItem>
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

export default SceneKeyEditor;
