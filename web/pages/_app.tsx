import React from 'react';
import { RecoilRoot } from 'recoil';
import { JssProvider } from 'react-jss';
import { createGenerateClassName } from '@material-ui/core/styles';

import QueryParamProvider from '../components/query-param-provider';

import '../styles/globals.css';
import 'monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css';

const generateClassName = createGenerateClassName({
  // @ts-ignore
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

function MyApp({ Component, pageProps }) {
  return (
    // @ts-ignore
    <JssProvider generateClassName={generateClassName}>
      <RecoilRoot>
        <QueryParamProvider>
          <Component {...pageProps} />
        </QueryParamProvider>
      </RecoilRoot>
    </JssProvider>
  );
}

export default MyApp;
