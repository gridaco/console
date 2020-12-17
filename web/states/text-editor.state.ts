import React from "react";
import { atom, selector } from "recoil";
import { targetLayerIdAtom } from "./preview-canvas.state";

/**
 * the very current value of focused edit text value. this is mostly used for displaying preview value on the canvas.
 */
export const currentTextEditValueAtom = atom<string>({
    key: 'current-text-edit-value-store',
    default: undefined!
})

// export const currentTextValueSelector = selector<string | undefined>({
//     key: "current-text-edit-value-selector",
//     get: ({ get }) => {
//         // if layer id does not match, return undefined.
//         const layerid = get(targetLayerIdAtom);
//         const layerCurrentValueSet = get(currentTextEditValueAtom)
//         if (layerCurrentValueSet.layerId == layerid) {
//             return layerCurrentValueSet.value
//         }
//         return undefined
//     },
// })


export const editorState = atom({
    key: "editorState",
    default: false,
});

export const previewLang = atom({
    key: "previewLang",
    default: "en",
});

export const dummyData = atom({
    key: "dummyData",
    default: [
        {
            key: "a/a",
            value: "call now1",
        },
        {
            key: "a/b",
            value: "call now2",
        },
        {
            key: "a/c",
            value: "call now3",
        },
        {
            key: "a/d",
            value: "call now4",
        },
        {
            key: "a/e",
            value: "call now5",
        },
    ],
});

export const langColumns = atom({
    key: "langColumns",
    default: [
        {
            type: "en",
            value: "Call Now",
        },
        {
            type: "ko",
            value: "지금 전화하세요",
        },
        {
            type: "jp",
            value: "今すぐお電話ください",
        },
    ],
});
