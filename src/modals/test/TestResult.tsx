import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectTestResult } from '../../features/testInfoSlice';
import { openServerError } from '../../features/messageSlice';

interface InfoState {
  title: string;
  subtitle: string;
  description: Array<string>;
  image: string;
}

const TestResult: React.FC = () => {
  const dispatch = useDispatch();
  const result = useSelector(selectTestResult);
  const [info, setInfo] = useState<InfoState | null>(null);
  const descItems = info?.description.map((sentence, idx) => {
    return <p key={idx}>{sentence}</p>;
  });
  useEffect(() => {
    axios
      .post('http://localhost:5000/tests/result', result)
      .then((res) => {
        const desc = res.data.result.description.split('\n');
        setInfo({
          ...info,
          title: res.data.result.title,
          subtitle: res.data.result.subtitle,
          description: desc,
          image: res.data.result.image,
        });
      })
      .catch(() => {
        dispatch(openServerError());
      });
  }, []);
  return (
    <ResultContainer>
      <Title>
        <ScrollAnimation
          offset={100}
          animateIn="animate__bounceIn"
          duration={1}
        >
          <h2>{info?.title}</h2>
        </ScrollAnimation>
      </Title>
      <Image>
        <img src={info?.image} alt="" />
      </Image>
      <ShortDescription>
        <h4>{info?.subtitle}</h4>
      </ShortDescription>
      <LongDescription>{descItems}</LongDescription>
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
`;
const Title = styled.div`
  font-size: 24px;
  letter-spacing: 2px;
  @media (max-width: 900px) {
    font-size: 20px;
  }
`;
const Image = styled.div`
  > img {
    width: 200px;
    height: 200px;
    border: 1px solid black;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ShortDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
`;
const LongDescription = styled.div`
  font-size: 20px;
  font-weight: 600;
  word-break: keep-all;
  @media (max-width: 900px) {
    font-size: 16px;
    text-align: center;
  }
`;
