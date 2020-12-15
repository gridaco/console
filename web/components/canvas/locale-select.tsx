import { useRecoilState } from "recoil"
import React from "react"
import { currentEditorialLocaleAtom } from "../../states/editor-state"
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";

/**
 * locale select compoent for canvas section
 */
export function CanvasLocaleSelect() {
    const [locale, setLocale] = useRecoilState(currentEditorialLocaleAtom)

    function handleChange(e: any) {
        const newLocale: string = e.target.value
        setLocale(newLocale)
    }

    return <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={locale}
        onChange={handleChange}
    >
        <MenuItem value={'ko'}>ko</MenuItem>
        <MenuItem value={'ja'}>ja</MenuItem>
        <MenuItem value={'en'}>en</MenuItem>
    </Select>
}