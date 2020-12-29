import React from 'react';
import Head from 'next/head';
import Editor from '../../sections/editor';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SceneLocalRepository, SceneRepositoryStore } from '../../repositories';
import { StorableScene } from '@bridged.xyz/client-sdk/lib';
import { SceneStoreService } from '@bridged.xyz/client-sdk/lib';
import ErrorPage from 'next/error';
import { useRecoilState } from 'recoil';
import { targetSceneIdAtom } from '../../states/preview-canvas.state';
import {
  DesignGlobalizationRepository,
  DesignGlobalizationRepositoriesStore,
} from '@bridged.xyz/client-sdk/lib/g11n/repository';

export default function Home() {
  const router = useRouter();

  const query = router.query;
  const sceneId: string = query.scene as string;
  const [
    sceneRepository,
    setScreenRepository,
  ] = useState<SceneLocalRepository>();
  const [
    desingGlobalizationRepository,
    setdesingGlobalizationRepository,
  ] = useState<DesignGlobalizationRepository>();
  const [targetSceneId, setTargetSceneId] = useRecoilState(targetSceneIdAtom);

  useEffect(() => {
    if (sceneId && !sceneRepository) {
      console.log('fetching scene data');
      const service = new SceneStoreService('temp', '');
      service.fetchScene(sceneId).then((response) => {
        console.log('response', response);
        const scene = response.data.data as StorableScene;
        const sceneRepository = SceneRepositoryStore.make(scene);
        const desingGlobalizationRepository = DesignGlobalizationRepositoriesStore.make(
          'temp',
          scene.id!
        );
        setTargetSceneId(sceneRepository.id);
        setScreenRepository(sceneRepository);
        setdesingGlobalizationRepository(desingGlobalizationRepository);
      });
    }
  });

  if (!sceneRepository) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      <Head>
        <title>G11n by bridged</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <Editor
          key={sceneRepository?.id}
          mode="translation"
          sceneId={sceneId}
        />
      </main>
    </div>
  );
}
