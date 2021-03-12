import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import axios from 'axios';

const About: React.FC = () => {
  const [count, setCount] = useState<number>();
  const left = useRef<HTMLDivElement>();
  useEffect(() => {
    if (left) {
      window.addEventListener('scroll', () => {
        left.current?.classList.toggle('animate', window.scrollY > 0);
      });
    }
    axios
      .get('https://laggard-server.ga/counter/visitCounter', {
        withCredentials: true,
      })
      .then((res) => {
        setCount(res.data.counter);
      });
  }, []);

  return (
    <section className="about">
      <div className="about_container">
        <div className="about_left">
          <ScrollAnimation
            offset={100}
            animateIn="animate__slideInLeft"
            duration={0.5}
          >
            <h3>About</h3>
          </ScrollAnimation>
          <ScrollAnimation
            duration={0.5}
            offset={100}
            animateIn="animate__slideInLeft"
          >
            <p>
              TV 프로그램 `놀라운 토요일` 그리고 `아는형님`에서도 나온
              <span> 가사 낭독 퀴즈</span>에 도전하세요!
            </p>
            <p>AI가 원톤으로 읽어주는 노래 가사를 듣고 곡명을 맞추면 됩니다.</p>
            <p>
              <span>음악 타입 테스트 : </span>내 음악 유형은 무엇인지
              알아보세요.
            </p>
            <p>
              <span>가사 낭독 퀴즈 : </span>퀴즈의 곡명을 맞추고 점수를
              올리세요. 그리고 점수가 제일 높은 10인에 도전하세요.
            </p>
          </ScrollAnimation>
        </div>
        <div className="about_right">
          <ScrollAnimation
            duration={0.5}
            offset={100}
            animateIn="animate__slideInRight"
          >
            <h3>참여자 수</h3>
          </ScrollAnimation>
          <ScrollAnimation
            duration={0.5}
            offset={100}
            animateIn="animate__slideInRight"
          >
            <span>{count}</span>
          </ScrollAnimation>
          <br></br>
          <ScrollAnimation
            duration={0.5}
            offset={100}
            animateIn="animate__zoomIn"
          >
            <PeopleAltIcon fontSize="large" />
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default About;
