import React from "react";
import { RecoilRoot } from "recoil";
import { JssProvider } from "react-jss";
import { createGenerateClassName } from "@material-ui/core/styles";

import "../styles/globals.css";

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: "c",
});

function MyApp({ Component, pageProps }) {
  return (
    <JssProvider generateClassName={generateClassName}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </JssProvider>
  );
}

export default MyApp;
