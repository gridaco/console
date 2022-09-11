import Head from "next/head";
import Script from "next/script";
import Modal from "react-modal";
import { RecoilRoot } from "recoil";
import QueryParamProvider from "../components/query-param-provider";

import "../styles/globals.css";
// import 'monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css';

Modal.setAppElement("#__next");

function GoogleOnetapSignin() {
  return (
    <>
      {/* region GSI - https://developers.google.com/identity/gsi/web/guides/client-library */}
      <Script src="https://accounts.google.com/gsi/client" async defer />
      {/* endregion */}
      {/* ontap display */}
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GSI_CLIENT_ID}
        data-login_uri="https://accounts.services.grida.co/signin/with-google"
        data-auto_prompt="true"
        data-state_cookie_domain=".grida.co"
        data-itp_support="false"
      ></div>
    </>
  );
}

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
      <GoogleOnetapSignin />
      <RecoilRoot>
        <QueryParamProvider>
          <Component {...pageProps} />
        </QueryParamProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
