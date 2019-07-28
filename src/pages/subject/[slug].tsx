import React from 'react';
import Router from 'next/router';
import Map from './Map/Component';
import createApollo from '../../lib/create-apollo-client';
import introspectionResult, {
  SubjectDocument,
  SubjectQuery,
  SubjectFragment,
} from '../../graphql/_generated_graphql_types';

interface Props {
  subject: SubjectFragment;
}

function Subject(props: Props) {
  return <Map subject={props.subject} />;
}

async function getInitialProps(props: any): Promise<Props> {
  const client = createApollo(
    {},
    {
      baseUrl: props.req ? `http://${(props.req as any).get('host')!}` : '',
      introspectionResult: introspectionResult as any,
    },
  );

  const requestBody = {
    query: SubjectDocument,
    variables: {
      slug: props.query.slug,
    },
  };

  const queryResult = await client.query<SubjectQuery>(requestBody);

  if (!queryResult.data.subject) {
    // Handle 404.
    if (props.res) {
      props.res.writeHead(301, {
        Location: '/',
      });

      props.res.end();
    } else {
      Router.push('/', '/');
    }
  }
  return {
    subject: queryResult.data.subject!,
  };
}

Subject.getInitialProps = getInitialProps;

export default Subject;
