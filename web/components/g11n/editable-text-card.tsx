import { RawAsset } from "@bridged.xyz/client-sdk/lib/assets";
import { GlobalizedKey, IGlobalizedKey } from "@bridged.xyz/client-sdk/lib/g11n";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useRecoilState } from "recoil";
import { currentEditorialLocaleAtom } from "../../states/editor-state";
import { TranslationFieldRow } from "./translation-field";

export default function (props: {
    translation: IGlobalizedKey
}) {
    const { translation } = props
    const [editorialLoclae] = useRecoilState(currentEditorialLocaleAtom)
    const defaultLocaleTranslationValue = (translation.translations as any)[editorialLoclae]?.value ?? 'no translation'

    const handleOnTranslationValueChange = (locale: string, value: string) => {
        console.log('handleOnTranslationValueChange', locale, value)
    }

    return (
        <Accordion style={{ padding: "20px" }}>
            <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
                <Typography style={{ width: "30%" }}>{translation.key}</Typography>
                <Typography style={{ width: "50%" }}>{defaultLocaleTranslationValue}</Typography>
                <Typography align="right" style={{ width: "20%" }}>
                    3/3
                    </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{translation.key}</Typography>
                <div style={{ width: 20 }} />
                {
                    Object.keys(translation.translations).map((k) => {
                        const keyId = translation.id
                        const localekey = k
                        const localeTranslationAsset = (translation.translations as any)[localekey] as RawAsset
                        const localeTranslationValue = localeTranslationAsset.value
                        return <TranslationFieldRow key={keyId} locale={localekey} initialValue={localeTranslationValue} onSubmit={handleOnTranslationValueChange} />
                    })
                }
            </AccordionDetails>
        </Accordion>
    );
}
