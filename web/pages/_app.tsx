import React, { useEffect } from 'react';
import { JssProvider } from 'react-jss';
import Modal from 'react-modal';
import { RecoilRoot } from 'recoil';
import { createGenerateClassName } from '@material-ui/core/styles';

import QueryParamProvider from '../components/query-param-provider';
import { analytics } from '../utils/firebase';

import '../styles/globals.css';
import 'monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css';

const generateClassName = createGenerateClassName({
  // @ts-ignore
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    try {
      analytics();
    } catch (_) {
      /* this error can be ignored since anaytics are only used on depoyed environment. */
    }
  }, []);

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
