import React from 'react';
import styled from 'styled-components';

const TestResult: React.FC = () => {
  return (
    <ResultContainer>
      <Title>
        <h2>한때 힙스터</h2>
      </Title>
      <div className="result-imgdesc">
        <Image></Image>
        <ShortDescription>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non alias
            sequi at molestias sed distinctio.
          </p>
        </ShortDescription>
      </div>
      <LongDescription>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          recusandae quisquam tenetur, rem maiores quae obcaecati quia a ab nemo
          debitis magnam reiciendis rerum explicabo! Atque voluptate hic sequi
          ea?
        </p>
      </LongDescription>
    </ResultContainer>
  );
};

export default TestResult;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  width: 90%;
  justify-content: space-around;
  .result-imgdesc {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Title = styled.div``;
const Image = styled.div`
  width: 160px;
  height: 160px;
  border: 1px solid black;
  flex: 0.5;
`;
const ShortDescription = styled.div`
  flex: 0.5;
`;
const LongDescription = styled.div``;
