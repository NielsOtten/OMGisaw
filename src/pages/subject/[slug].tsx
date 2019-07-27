import React from 'react';

interface Props {
  slug: string;
}

function Subject(props: Props) {
  return <h1>{props.slug}</h1>;
}

Subject.getInitialProps = async function(props: any): Promise<Props> {
  return {
    slug: props.query.slug,
  };
};

export default Subject;
