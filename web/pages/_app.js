import React from 'react';
import { RecoilRoot } from 'recoil';
import { JssProvider } from 'react-jss';
import { createGenerateClassName } from '@material-ui/core/styles';

import QueryParamProvider from '../components/query-param-provider';

import '../styles/globals.css';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

function MyApp({ Component, pageProps }) {
  return (
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
