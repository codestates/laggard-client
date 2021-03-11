import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectTestResult } from '../../features/testInfoSlice';

interface InfoState {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const TestResult: React.FC = () => {
  const result = useSelector(selectTestResult);
  const [info, setInfo] = useState<InfoState | null>(null);
  useEffect(() => {
    axios
      .post('http://localhost:5000/tests/result', result)
      .then((res) => {
        console.log(res.data.result);
        setInfo({
          ...info,
          title: res.data.result.title,
          subtitle: res.data.result.subtitle,
          description: res.data.result.description,
          image: res.data.result.image,
        });
      })
      .catch((err) => {
        console.log('err');
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
      <div className="result-imgdesc">
        <Image>
          <img src={info?.image} alt="" />
        </Image>
        <ShortDescription>
          <p>{info?.subtitle}</p>
        </ShortDescription>
      </div>
      <LongDescription>
        <p>{info?.description}</p>
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
    justify-content: space-around;
    width: 100%;
  }
`;
const Title = styled.div`
  font-size: 24px;
`;
const Image = styled.div`
  > img {
    width: 120px;
    height: 120px;
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
`;
const LongDescription = styled.div``;
