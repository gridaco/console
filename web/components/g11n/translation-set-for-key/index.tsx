import React from "react";
import { TranslationFieldRow } from "../translation-field";

/**
 * translation sets, contains multiple translation edit items
 */
export function TranslationSetForKey(props: {
    key: string
}) {
    const locales = ['en', 'ja', 'ko']
    return <div>
        {
            locales.map((l) => {
                return <TranslationFieldRow key={props.key} locale={l} initialValue='empty' />
            })
        }
    </div>
}