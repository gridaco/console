import { TransportLayer } from "@bridged.xyz/client-sdk/lib";
import { atom, selector } from "recoil";
import { currentSceneRepository } from "../repositories";

export const targetLayerIdAtom = atom<string>({
    key: "target-layer-id",
    default: undefined!,
});


export const targetLayerSelector = selector<TransportLayer>({
    key: "target-layer-selector", // unique ID
    get: ({ get }) => {
        const id = get(targetLayerIdAtom);
        const layer = currentSceneRepository.layer(id)
        return layer
    },
});

export const currentTextLayerEditingValueAtom = atom<string>({
    key: "current-layer-text-edit-value-selector",
    default: undefined!
});