import React, { useEffect } from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import axios from 'axios';

const TestResult: React.FC = () => {
  useEffect(() => {
    axios.post('http:localhost:5000/');
  });
  return (
    <ResultContainer>
      <Title>
        <ScrollAnimation
          offset={100}
          animateIn="animate__bounceIn"
          duration={1}
        >
          <h2>한때 힙스터</h2>
        </ScrollAnimation>
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
  color: whitesmoke;
  .result-imgdesc {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Title = styled.div`
  font-size: 24px;
`;
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
