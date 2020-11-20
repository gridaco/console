import Head from "next/head";
import Page from "../../sections";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>G11n by bridged</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Page router={router} />
            </main>
        </div>
    );
}
