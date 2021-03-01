import React, { useState } from 'react';
import styled from 'styled-components';
import SelectDecade from './SelectDecade';

const QuizModal: React.FC = () => {
  const [start, setStart] = useState(false);
  return (
    <div>
      <Container>
        <Modal>{!start ? <SelectDecade /> : undefined}</Modal>
      </Container>
    </div>
  );
};

export default QuizModal;

const Container = styled.div``;

const Modal = styled.div`
  width: 800px;
  height: 500px;
  background-color: rgba(191, 191, 191, 0.8);
  border-radius: 6px;
  box-shadow: 5px 5px 24px #a2b1c6, -5px -5px 24px white;
`;
