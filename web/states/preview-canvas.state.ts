import { TransportLayer } from "@bridged.xyz/client-sdk/lib";
import { atom, selector } from "recoil";
import { currentSceneRepository } from "../repositories";

export const targetLayerIdAtom = atom<string>({
    key: "target-layer-id",
    default: undefined!,
});


export const targetLayerSelector = selector<TransportLayer<any>>({
    key: "target-layer-selector", // unique ID
    get: ({ get }) => {
        const id = get(targetLayerIdAtom);
        const layer = currentSceneRepository.layer(id)
        return layer
    },
});