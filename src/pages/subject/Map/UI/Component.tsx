import React, { lazy, Suspense } from 'react';
import { css } from 'linaria';
import CenterButton from './slugDependent/default/CenterButton';
import { SubjectFragment } from '../../../../graphql/_generated_graphql_types';

const UIWrapper = css`
  z-index: 9999;
  position: relative;
  width: 100vw;
  height: 100vh;
`;

interface Props {
  subject: SubjectFragment;
}

export default function UI({ subject }: Props) {
  const CenterButtonComponent = lazy(() =>
    import(`./slugDependent/${subject.slug}/CenterButton`).catch(() => ({
      default: () => <CenterButton name={subject.nickname} />,
    })),
  );

  return (
    <section className={`UISection ${UIWrapper}`}>
      <Suspense fallback="loading">
        <CenterButtonComponent name={subject.nickname} />
      </Suspense>
    </section>
  );
}
