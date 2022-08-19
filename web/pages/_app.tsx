import Modal from 'react-modal';
import { RecoilRoot } from 'recoil';
import { createGenerateClassName } from '@material-ui/core/styles';

import QueryParamProvider from '../components/query-param-provider';

import '../styles/globals.css';
import 'monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css';

const generateClassName = createGenerateClassName({
  // @ts-ignore
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <QueryParamProvider>
        <Component {...pageProps} />
      </QueryParamProvider>
    </RecoilRoot>
  );
}

export default MyApp;
