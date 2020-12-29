import React, { useState } from 'react';
import { styled } from '@linaria/react';
import Axios from 'axios';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import {
  QuicklookQueryParams,
  framework,
  language,
} from '@bridged.xyz/client-sdk/lib/projects/quicklook';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

import FrameFlutter from '../../components/frame-flutter';
import DashboardAppbar from '../../components/appbar/dashboard.appbar';

const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false });

let IS_LOADED_ONCE: boolean = false;
/**
 * frame or url is required
 * @param frame the frame id of selected node, which uploaded to default bridged quicklook s3 buket.
 * @param url the custom url of the compiled js file. any source is allowed.
 */
export default function Frame() {
  const router = useRouter();
  const [source, setSource] = useState<string>();
  let editingSource: string;

  const query: QuicklookQueryParams = {
    id: (router.query.id as string) ?? '',
    framework: (router.query.framework as 'flutter' | 'react') ?? 'flutter',
    language: (router.query.language as 'dart' | 'js') ?? 'js',
    url: router.query.url as string,
    name: router.query.name as string,
    w: Number.parseInt(router.query.w as string) ?? 375,
    h: Number.parseInt(router.query.h as string) ?? 812,
  };

  if (!IS_LOADED_ONCE) {
    switch (query.framework) {
      case 'flutter':
        if (query.url) {
          if (query.language == 'js') {
            setSource(query.url);
          } else if (query.language == 'dart') {
            // fetch dart file and set as source
            Axios.get(query.url).then((r) => {
              IS_LOADED_ONCE = true;

              const dartSource = r.data;

              editingSource = dartSource;
              setSource(dartSource);
            });
          }
        }
        break;
      case 'react':
    }
  }

  const run = () => {
    if (editingSource) {
      setSource(editingSource);
    } else {
      alert('your code has no changes');
    }
  };

  const hasDiff = () => {
    return editingSource !== source;
  };

  return (
    <>
      <DashboardAppbar
        title={query.name || 'No Name'}
        backButton="DASHBOARD"
        onClickShare={() => {
          navigator.clipboard.writeText(window.location.href);
          alert('copied to clipboard');
        }}
        onClickPlay={run}
      />
      <Wrapper>
        <SideContainer>
          <FrameBackground>
            {appFrame({
              id: query.id,
              framework: query.framework,
              source: source,
              language: query.language,
            })}
          </FrameBackground>
        </SideContainer>
        <SideContainer style={{ width: '45vw' }}>
          <Toolbar>
            <TabList>
              <TabButton style={{ color: '#000000', marginRight: 8 }}>
                <TabIconImage src="/assets/icons/mdi_code_round.svg" />
                Code Editor
              </TabButton>
              <TabButton>
                <TabIconImage src="/assets/icons/mdi_language_round.svg" />
                Language translation
              </TabButton>
            </TabList>
            <ButtonList>
              <Button
                style={{
                  backgroundColor: '#333333',
                  marginRight: 12,
                }}
                onClick={() =>
                  open('https://github.com/bridgedxyz/console.bridged.xyz')
                }
              >
                <ButtonIconImage src="/assets/icons/github.svg" />
                <span>improve this page on github</span>
              </Button>
              <Button
                style={{
                  backgroundColor: '#2562FF',
                }}
                onClick={() => {
                  open(
                    'https://github.com/bridgedxyz/assistant/issues/new/choose'
                  );
                }}
              >
                <ButtonIconImage src="/assets/icons/mdi_play_circle_filled_round.svg" />
                <span>copy share to link</span>
              </Button>
            </ButtonList>
          </Toolbar>
          <MonacoEditor
            language="dart"
            theme="vs-dark"
            value={source}
            options={{ unusualLineTerminators: 'off' }}
            onChange={(value: string) => {
              editingSource = value;
            }}
            editorDidMount={(
              editor: monacoEditor.editor.IStandaloneCodeEditor
            ) => {
              // @ts-ignore
              window.MonacoEnvironment.getWorkerUrl = (moduleId, label) => {
                if (label === 'json') return '/_next/static/json.worker.js';
                if (label === 'css') return '/_next/static/css.worker.js';
                if (label === 'html') return '/_next/static/html.worker.js';
                if (label === 'typescript' || label === 'javascript')
                  return '/_next/static/ts.worker.js';
                return '/_next/static/editor.worker.js';
              };
            }}
          />
        </SideContainer>
      </Wrapper>
    </>
  );
}

function appFrame(props: {
  id: string;
  source: string | undefined;
  framework: framework;
  language: language;
}) {
  console.log(props);
  const loading = <div>loading..</div>;

  if (!props.source) {
    return loading;
  }

  switch (props.framework) {
    case 'flutter':
      if (props.language == 'js') {
        return <FrameFlutter id={props.id} js={props.source}></FrameFlutter>;
      } else if (props.language == 'dart') {
        return (
          <FrameFlutter
            key={props.source}
            id={props.id}
            dart={props.source}
          ></FrameFlutter>
        );
      }
      return loading;
    case 'react':
      return <p>react framework is not yet supported.</p>;
    default:
      return loading;
  }
}

const Wrapper = styled.div`
  margin-top: 56px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  min-height: calc(100vh - 56px);
  overflow-y: hidden;
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FrameBackground = styled.div`
  flex: 1;
  display: flex;
  background: linear-gradient(90deg, #f1f1f1 20px, transparent 1%) center,
    linear-gradient(#f1f1f1 20px, transparent 1%) center, #e8e1e1;
  background-size: 24px 24px;
`;

const Toolbar = styled.div`
  padding: 10px 12px;
  background: #ffffff;
  box-shadow: inset 0px -1px 0px #e3e3e3;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TabList = styled.div`
  display: flex;
  align-items: center;
`;

const TabButton = styled.button`
  border: 0;
  background-color: transparent;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  color: #dadadc;
  border-radius: 4px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active,
  &:focus {
    outline: 0;
  }
`;

const TabIconImage = styled.img`
  margin-right: 8px;
  width: 24px;
  height: 24px;
`;

const ButtonList = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  color: white;
  padding: 8px 12px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    text-transform: capitalize;
  }

  &:active,
  &:focus {
    outline: 0;
  }
`;

const ButtonIconImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;
