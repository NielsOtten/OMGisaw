import React, { Fragment } from 'react';
import Router from 'next/router';
import Map from './Map/Component';
import {
  SubjectDocument,
  SubjectQuery,
  SubjectFragment,
} from '../../graphql/_generated_graphql_types';
import { NewNextPageContext } from '../_app';

interface Props {
  subject: SubjectFragment;
}

function Subject(props: Props) {
  return (
    <Fragment>
      <Map subject={props.subject} />
    </Fragment>
  );
}

async function getInitialProps(props: NewNextPageContext): Promise<Props> {
  const requestBody = {
    query: SubjectDocument,
    variables: {
      slug: props.query.slug,
    },
  };

  const queryResult = await props.apolloClient.query<SubjectQuery>(requestBody);

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
