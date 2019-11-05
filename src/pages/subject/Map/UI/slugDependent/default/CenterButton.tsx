import React from 'react';
import { css } from 'linaria';

interface Props {
  name: String;
}

const defaultButton = css`
  pointer-events: auto;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -150px;
  width: 300px;
  padding: 11px 0;
  font-size: 22px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 -1px 0 rgba(0, 0, 0, 0.02);
`;

const defaultSpan = css`
  display: block;
  font-weight: bold;
  font-size: 28px;
`;

export default function CenterButton({ name }: Props) {
  return (
    <button
      type="button"
      className={defaultButton}
      onClick={() => {
        console.log('clickButton');
      }}
    >
      OMG i saw <span className={defaultSpan}>{name}</span>
    </button>
  );
}
