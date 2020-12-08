import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";

interface Props { }

export default class extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Accordion style={{ padding: "20px" }}>
                <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
                    <Typography style={{ width: "30%" }}>key/name</Typography>
                    <Typography style={{ width: "50%" }}>asdfasfssdfa</Typography>
                    <Typography align="right" style={{ width: "20%" }}>
                        3/3
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>key/name</Typography>
                    <div style={{ width: 20 }} />
                    <div></div>
                    <TextField />
                    <TextField />
                </AccordionDetails>
            </Accordion>
        );
    }
}
