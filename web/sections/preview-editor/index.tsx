import React, { useState } from "react";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";

const PreviewEditor = () => {
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
          <Accordion style={{ padding: "20px" }}>
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography style={{ width: "30%" }}>key/name</Typography>
              <Typography style={{ width: "50%" }}>asdfasfssdfa</Typography>
              <Typography align="right" style={{ width: "20%" }}>
                3/3
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>key/name</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default PreviewEditor;
