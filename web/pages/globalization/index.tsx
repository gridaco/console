import Head from "next/head";
import Editor from "../../sections/editor";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SceneLocalRepository, ScenesRepository } from "../../repositories";
import { StorableScene } from "@bridged.xyz/client-sdk/lib";
import { SceneStoreService } from "@bridged.xyz/client-sdk/lib"
import ErrorPage from 'next/error'



export default function Home() {
  const router = useRouter();

  const query = router.query;
  const sceneId: string = query.scene as string;
  const [sceneRepository, setScreenRepository] = useState<SceneLocalRepository>();

  useEffect(() => {
    if (sceneId && !sceneRepository) {
      console.log('fetching scene data')
      const service = new SceneStoreService("", "")
      service.fetchScene(sceneId).then((response) => {
        console.log('response', response)
        const sceneRepository = ScenesRepository.make(response.data.data as StorableScene)
        console.log('made sceneRepository', sceneRepository)
        setScreenRepository(sceneRepository);
      })
    }
  })

  if (!sceneRepository) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <div>
      <Head>
        <title>G11n by bridged</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Editor key={sceneRepository?.id} mode="translation" sceneId={sceneId} />
      </main>
    </div>
  );
}
