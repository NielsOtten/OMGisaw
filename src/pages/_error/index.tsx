import React, { useState } from 'react';
import { useCreateSubjectMutation } from '../../graphql/_generated_graphql_types';

export default function NotFound() {
  const [values, setValues] = useState<{
    name: string;
    nickname: string;
    picture: string;
    description: string;
  }>({
    name: '',
    nickname: '',
    picture: '',
    description: '',
  });

  const [createSubjectMutation] = useCreateSubjectMutation();

  function onChangeFormValue(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.currentTarget;
    setValues(currentValues => ({
      ...currentValues,
      [name]: value,
    }));
  }

  return (
    <>
      <h1>Oops!</h1>
      <h2>
        This page doesn&apos;t exist yet. Were you looking for one of the below
        pages?
      </h2>
      <ul>
        <li>Suggestion 1</li>
        <li>Suggestion 2</li>
        <li>Suggestion 3</li>
      </ul>
      <h2>
        If you feel like your page should exist, feel free to create it below.
      </h2>
      <form
        method="POST"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          createSubjectMutation({
            variables: {
              ...values,
              slug: values.nickname.toLowerCase().replace(/ /g, '-'),
            },
          });
        }}
      >
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={onChangeFormValue}
        />
        <input
          type="text"
          name="nickname"
          value={values.nickname}
          onChange={onChangeFormValue}
        />
        <input
          type="text"
          name="picture"
          value={values.picture}
          onChange={onChangeFormValue}
        />
        <textarea
          name="description"
          onChange={onChangeFormValue}
          value={values.description}
        />
        <input type="submit" value="Create page" />
      </form>
    </>
  );
}
