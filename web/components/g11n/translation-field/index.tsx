import { Typography } from "@material-ui/core";
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
    initialValue: string,
}) {
    return <>
        <div>
            <Typography>{props.locale}</Typography>
            <TranslationEditField {...props} />
        </div>
    </>
}


export function TranslationEditField(props: {
    key: string,
    locale: string,
    initialValue: string,
}) {
    const [currentEditTextValue, setCurrentEditTextValue] = useRecoilState(currentTextEditValueAtom)

    const handleEdit = (e: any) => {
        setCurrentEditTextValue(e.target.value)
    }

    return <TextField onChange={handleEdit} fullWidth variant='outlined' />
}