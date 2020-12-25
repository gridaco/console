import { StorableLayer, StorableScene } from "@bridged.xyz/client-sdk/lib";

// NOT USING
export class SceneRepositoryStore {
  static repositories: Array<SceneLocalRepository> = [];

  static find(scene: string): SceneLocalRepository {
    return this.repositories.find((r) => r.scene.id == scene)!;
  }

  static make(scene: StorableScene) {
    const newRepository = new SceneLocalRepository(scene);
    this.repositories.push(newRepository);
    console.log("made sceneRepository", newRepository);
    return newRepository;
  }
}

export class SceneLocalRepository {
  readonly id: string;
  constructor(readonly scene: StorableScene) {
    this.id = scene.id!;
  }

  layer(id: string): StorableLayer {
    return this.scene.layers.find((e) => e.nodeId == id)!;
  }
}
