import { Box, Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { currentTextEditValueAtom } from "../../../states"
import { useRecoilState, useRecoilValue } from "recoil";

/**
 * single field with translation compatability
 */
export function TranslationFieldRow(props: {
    key: string,
    locale: string,
    initialValue?: string,
    onSubmit: (l: string, s: string) => void
}) {
    return <>
        <div>
            <Grid container spacing={2}>
                <Grid item>
                    <Box width={24}>
                        <Typography>{props.locale}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <TranslationEditField {...props} onSubmit={(s) => {
                        props.onSubmit(props.locale, s)
                    }} />
                </Grid>
            </Grid>
        </div>
    </>
}


export function TranslationEditField(props: {
    key: string,
    locale: string,
    initialValue?: string,
    onSubmit: (s: string) => void
}) {
    const [currentEditTextValue, setCurrentEditTextValue] = useRecoilState(currentTextEditValueAtom)

    const handleEdit = (e: any) => {
        setCurrentEditTextValue(e.target.value)
    }

    // on key down, when enter key is pressed via keyboard or save button clicked.
    const handleOnSubmit = (e: any) => {
        console.log('saving translation - ', currentEditTextValue)
        props.onSubmit(currentEditTextValue)
    }

    // FIXME
    const getDisplayValue = (): string => {
        if (props.initialValue && !currentEditTextValue) {
            return props.initialValue
        } else {
            return currentEditTextValue
        }
    }

    return <TextField onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
            handleOnSubmit(ev)
            ev.preventDefault();
        }
    }} value={getDisplayValue()} onChange={handleEdit} fullWidth variant='outlined' />
}