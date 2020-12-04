import { TransportLayer, VanillaScreenTransport } from "@bridged.xyz/client-sdk/lib";

// NOT USING
export class ScenesRepository {
    static repositories: Array<SceneLocalRepository> = []
}



// TODO - clean this (dirty)
export let currentSceneRepository: SceneLocalRepository


export class SceneLocalRepository {
    constructor(readonly scene: VanillaScreenTransport) {
        currentSceneRepository = this
    }


    layer(id: string): TransportLayer {
        return this.scene.elements.find(e => e.id == id)!
    }
}