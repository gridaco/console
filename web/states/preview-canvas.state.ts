import { StorableLayer } from "@bridged.xyz/client-sdk/lib";
import { atom, selector } from "recoil";
import { SceneRepositoryStore } from "../repositories";

export const targetLayerIdAtom = atom<string>({
    key: "target-layer-id",
    default: undefined!,
});

export const targetSceneIdAtom = atom<string>({
    key: "target-scene-id",
    default: undefined!,
});

export const targetLayerSelector = selector<StorableLayer>({
    key: "target-layer-selector", // unique ID
    get: ({ get }) => {
        const id = get(targetLayerIdAtom);
        const sceneId = get(targetSceneIdAtom)
        const layer = SceneRepositoryStore.find(sceneId).layer(id)
        return layer
    },
});

export const currentTextLayerEditingValueAtom = atom<string>({
    key: "current-layer-text-edit-value-selector",
    default: undefined!
});