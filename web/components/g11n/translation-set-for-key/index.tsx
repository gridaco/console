import { RawAsset } from "@bridged.xyz/client-sdk/lib";
import { Translations } from "@bridged.xyz/client-sdk/lib/g11n";
import React from "react";
import { TranslationFieldRow } from "../translation-field";

/**
 * translation sets, contains multiple translation edit items
 */
export function TranslationSetForKey(props: {
    key: string,
    locales: string[],
    translations?: Translations
    onSubmit: (locale: string, value: string) => void
}) {
    const locales = props.locales

    const handleOnTranslationValueChange = (locale: string, value: string) => {
        console.log('handleOnTranslationValueChange', locale, value)
        props.onSubmit(locale, value)
    }

    const getInitialValue = (locale: string): string | undefined => {
        try {
            return ((props.translations as any)[locale] as RawAsset).value
        } catch (_) {
            return undefined
        }
    }

    return <div>
        {
            locales.map((locale) => {
                return <TranslationFieldRow key={props.key} locale={locale} initialValue={getInitialValue(locale)} onSubmit={handleOnTranslationValueChange} />
            })
        }
    </div>
}