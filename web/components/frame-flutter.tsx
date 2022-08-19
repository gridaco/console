/**
 * IMPORTANT NOTE TO CONTRIBUTORS.
 * FLUTTER FRAME'S MOST RELIABLE IMPLMENETATION SHOULD BE HOSTED ON APPBOX FRAME
 * FRAMES.APPBOX.BRIDGED.XYZ/FLUTTER -- THIS MAY BE EXPORTED AS A REACT COMPONENT INCLUDING HTML SOURCE IN-JS FIILE,
 * BUT FOR NOW WE MUST SYNC THE IMPLEMENTATION BY MANUAL
 * PLEASE VISIT https://github.com/bridgedxyz/appbox/tree/main/packages/frames
 */

import { NumberSize, Resizable } from 're-resizable';
import { Direction } from 're-resizable/lib/resizer';
import React from 'react';
import { styled } from '@linaria/react';
import { compileFlutterApp } from '@base-sdk/build/dist/flutter';
import {
  FlutterLoadingState,
  FlutterFrameQuery,
} from '@base-sdk/base/dist/frame-embed';
import Alert from '@material-ui/lab/Alert';

interface State {
  viewportWidth: number;
  viewportHeight: number;
  compileState: FlutterLoadingState;
}

export default class FrameFlutter extends React.Component<
  FlutterFrameQuery,
  State
> {
  constructor(props: FlutterFrameQuery) {
    super(props);
    this.state = {
      compileState: 'pre-warming',
      viewportHeight: 812,
      viewportWidth: 375,
    };
  }

  componentDidMount() {}

  async getCompiledJsSource(): Promise<string> {
    if (this.props.language == 'js') {
      this.setState(() => {
        return { compileState: 'js-compiled' };
      });
      return this.props.src;
    } else if (this.props.language == 'dart') {
      try {
        const app = await compileFlutterApp({
          dart: this.props.src,
          id: this.props.id,
        });

        var blob = new Blob([app.js!], {
          type: 'application/javascript',
        });
        var url = URL.createObjectURL(blob);

        this.setState(() => {
          return { compileState: 'js-compiled' };
        });

        return url;
      } catch (e) {
        this.setState(() => {
          return { compileState: 'failed' };
        });
        return '';
      }
    } else {
      throw 'one of dart or js should be provided';
    }
  }

  onIframeLoaded = () => {
    this.setState(() => {
      return { compileState: 'compiling' };
    });

    let iframe = document.getElementById('frame') as HTMLIFrameElement;

    // get the compiled js source
    this.getCompiledJsSource().then((js) => {
      // post message to iframe to execute js source
      iframe.contentWindow!.postMessage(
        {
          command: 'execute',
          js: js,
        },
        '*'
      );

      this.setState(() => {
        return { compileState: 'drawing' };
      });
      this.setState(() => {
        return { compileState: 'complete' };
      });
    });

    iframe.contentWindow!.onerror = (
      event: Event | string,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error
    ) => {
      console.error('error from flutter js', source);
    };
  };

  onResize = (
    event: MouseEvent | TouchEvent,
    direction: Direction,
    elementRef: HTMLElement,
    delta: NumberSize
  ) => {
    const newSize = this.resizable?.size;

    // resize iframe's size as the container
    if (newSize) {
      this.setState(() => {
        return {
          viewportHeight: newSize.height,
          viewportWidth: newSize.width,
        };
      });
    }
  };

  resizable: Resizable | null = null;

  message() {
    switch (this.state.compileState) {
      case 'failed':
        return (
          <Alert severity="error" style={{ border: '1px solid #f44336' }}>
            Failed to compile. check your code
          </Alert>
        );
      case 'complete':
        return (
          <Alert severity="success" style={{ border: '1px solid #4caf50' }}>
            Complete
          </Alert>
        );
      default:
        return (
          <Alert
            severity="info"
            style={{ textTransform: 'capitalize', border: '1px solid #2196f3' }}
          >
            {this.state.compileState}...
          </Alert>
        );
    }
  }

  render() {
    return (
      <ResizableWrapper>
        <Resizable
          ref={(c) => {
            this.resizable = c;
          }}
          defaultSize={{
            width: 375,
            height: 812,
          }}
          onResize={this.onResize}
          handleComponent={{
            bottomRight: BottomRightHandle(),
          }}
        >
          <Iframe
            id="frame"
            width={this.state.viewportWidth}
            height={this.state.viewportHeight}
            src="/quicklook-assets/flutter/frame-flutter.html"
            sandbox="allow-scripts allow-same-origin"
            onLoad={this.onIframeLoaded}
          />
        </Resizable>
        <MessageWrapper>{this.message()}</MessageWrapper>
      </ResizableWrapper>
    );
  }
}

const SouthEastArrow = () => (
  <svg
    width="20px"
    height="20px"
    version="1.1"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m70.129 67.086l1.75-36.367c-0.035156-2.6523-2.9414-3.6523-4.8164-1.7773l-8.4531 8.4531-17.578-17.574c-2.3438-2.3438-5.7188-1.5625-8.0586 0.78125l-13.078 13.078c-2.3438 2.3438-2.4141 5.0117-0.074219 7.3516l17.574 17.574-8.4531 8.4531c-1.875 1.875-0.83594 4.8203 1.8164 4.8555l36.258-1.8594c1.6836 0.019531 3.1328-1.2812 3.1133-2.9688z" />
  </svg>
);

const BottomRightHandle = () => (
  <CustomHandle>
    <SouthEastArrow />
  </CustomHandle>
);

const CustomHandle = (props: any) => (
  <div
    style={{
      background: '#fff',
      borderRadius: '2px',
      border: '1px solid #ddd',
      height: '100%',
      width: '100%',
      padding: 0,
    }}
    className={'SomeCustomHandle'}
    {...props}
  />
);

const ResizableWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Iframe = styled.iframe`
  border: 0;
`;

const MessageWrapper = styled.div`
  margin-top: 12px;
`;
