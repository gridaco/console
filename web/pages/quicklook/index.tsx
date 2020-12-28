import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FrameFlutter from '../../components/frame-flutter';
import dynamic from 'next/dynamic';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {
  QuicklookQueryParams,
  framework,
  language,
} from '@bridged.xyz/client-sdk/lib/projects/quicklook';

const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false });
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

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

  const q: QuicklookQueryParams = {
    id: (router.query.id as string) ?? '',
    framework: (router.query.framework as 'flutter' | 'react') ?? 'flutter',
    language: (router.query.language as 'dart' | 'js') ?? 'js',
    url: router.query.url as string,
    name: router.query.name as string,
    w: Number.parseInt(router.query.w as string) ?? 375,
    h: Number.parseInt(router.query.h as string) ?? 812,
  };

  if (!IS_LOADED_ONCE) {
    switch (q.framework) {
      case 'flutter':
        if (q.url) {
          if (q.language == 'js') {
            setSource(q.url);
          } else if (q.language == 'dart') {
            // fetch dart file and set as source
            Axios.get(q.url).then((r) => {
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
    <div style={{ margin: 48 }}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item>
          {appFrame({
            id: q.id,
            framework: q.framework,
            source: source,
            language: q.language,
          })}
        </Grid>
        <Grid item>
          <div style={{ width: '50vw' }}>
            <MonacoEditor
              height={'860px'}
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
            {/* disabled={hasDiff()}  */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                run();
              }}
            >
              RE-RUN
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('copied to clipboard');
              }}
            >
              copy sharable link
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                open('https://github.com/bridgedxyz/console.bridged.xyz');
              }}
            >
              improve this page on github
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                open(
                  'https://github.com/bridgedxyz/assistant/issues/new/choose'
                );
              }}
            >
              report bug
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
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
