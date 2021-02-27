import React from 'react';
import styled from 'styled-components';

const QuizModal: React.FC = () => {
  return (
    <div>
      <Container>
        <Modal></Modal>
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
`;
