import React from 'react';
import { AppContext } from 'next/app';

interface Props {
  component: AppContext['Component'];
  pageProps: any;
}

export default function(props: Props) {
  return (
    <>
      <header />
      <main>
        <props.component {...props.pageProps} />
      </main>
      <footer />
    </>
  );
}
