import { Box, Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useEffect } from "react";
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
            <Grid container spacing={2} alignContent='stretch'>
                <Grid item>
                    <Box width={160} color={'#94959A'} component='div' style={{
                        backgroundColor: '#F9F9F9',
                        borderRadius: 4
                    }} paddingX={3} paddingY={2}>
                        <Typography>{props.locale}</Typography>
                    </Box>
                </Grid>
                <Grid item>
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

    return <TextField
        onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
                handleOnSubmit(ev)
                ev.preventDefault();
            }
        }} defaultValue={props.initialValue} onChange={handleEdit} fullWidth variant='outlined' />
}