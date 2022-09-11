import Head from "next/head";
import Script from "next/script";
import Modal from "react-modal";
import { RecoilRoot } from "recoil";
import QueryParamProvider from "../components/query-param-provider";

import "../styles/globals.css";
// import 'monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css';

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-2BP4168N58"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2BP4168N58');
        `}
      </Script>
      <Head>
        <title>Grida console</title>
      </Head>
      <RecoilRoot>
        <QueryParamProvider>
          <Component {...pageProps} />
        </QueryParamProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
