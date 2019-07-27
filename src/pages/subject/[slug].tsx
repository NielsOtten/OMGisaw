import React from 'react';
import Map from './Map/Component';

interface Props {
  slug: string;
}

function Subject() {
  return <Map />;
}

Subject.getInitialProps = async function(props: any): Promise<Props> {
  return {
    slug: props.query.slug,
  };
};

export default Subject;
