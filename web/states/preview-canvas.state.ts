import { StorableLayer } from '@bridged.xyz/client-sdk/lib';
import { atom, selector } from 'recoil';
import { SceneRepositoryStore } from '../repositories';

export const targetLayerIdAtom = atom<string | undefined>({
  key: 'target-layer-id',
  default: undefined,
});

export const targetSceneIdAtom = atom<string>({
  key: 'target-scene-id',
  default: undefined!,
});

export const targetLayerSelector = selector<StorableLayer | undefined>({
  key: 'target-layer-selector', // unique ID
  get: ({ get }) => {
    const id = get(targetLayerIdAtom);
    const sceneId = get(targetSceneIdAtom);
    const layer = id ? SceneRepositoryStore.find(sceneId).layer(id) : undefined;
    return layer;
  },
});

export const currentTextLayerEditingValueAtom = atom<string>({
  key: 'current-layer-text-edit-value-selector',
  default: undefined!,
});
