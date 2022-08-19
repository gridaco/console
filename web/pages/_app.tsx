import Modal from 'react-modal';
import { RecoilRoot } from 'recoil';
import QueryParamProvider from '../components/query-param-provider';

import '../styles/globals.css';
// import 'monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css';

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
