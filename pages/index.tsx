import React from 'react';

import { styled } from 'linaria/react';

const Box = styled.div`
  margin-top: 40px;
  margin-left: 40px;
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: spin 2s linear infinite;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

function Home() {
  return (
    <div>
      <Box>OMG I Saw .......</Box>
    </div>
  );
}

export default Home;
