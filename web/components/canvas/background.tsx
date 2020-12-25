import React from 'react';
import './background.module.scss';

export function CanvasBackground(props: { onClick: (e: any) => void }) {
  return (
    <div
      className="canvas-bg"
      style={{
        width: '50vw',
        height: '100vw',
        position: 'absolute',
        top: 0,
      }}
      onClick={props.onClick}
    ></div>
  );
}
