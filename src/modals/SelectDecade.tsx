import React from 'react';
import styled from 'styled-components';

const SelectDecade: React.FC = () => {
  return (
    <Container>
      <div className="title">
        <h3>퀴즈의 시대를 선택해주세요</h3>
      </div>
      <form className="years">
        <div className="left">
          <div className="option">
            <input type="radio" name="select" id="1980" value="1980" />
            <label htmlFor="1980">1980년대</label>
          </div>
          <div className="option">
            <input type="radio" name="select" id="1990" value="1990" />
            <label htmlFor="1990">1990년대</label>
          </div>
          <div className="option">
            <input type="radio" name="select" id="2000" value="2000" />
            <label htmlFor="2000">2000년대</label>
          </div>
        </div>
        <div className="right">
          <div className="option">
            <input type="radio" name="select" id="2010" value="2010" />
            <label htmlFor="2010">2010년대</label>
          </div>
          <div className="option">
            <input type="radio" name="select" id="random" value="random" />
            <label htmlFor="random">랜덤</label>
          </div>
        </div>
      </form>
      <div className="button">
        <button>시작하기</button>
      </div>
    </Container>
  );
};

export default SelectDecade;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;

  .title {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }

  .years {
    width: 500px;
    height: 200px;
    display: flex;

    .left {
      flex: 0.5;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }

    .right {
      flex: 0.5;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .option {
        margin-left: 3rem;
      }
    }

    label {
      font-size: 30px;
      margin-left: 8px;
      font-weight: 700;
    }

    input {
      height: 1rem;
      width: 1rem;
      cursor: pointer;
    }

    .option {
      display: flex;
      align-items: center;
    }

    .option-last {
    }
  }

  button {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 8px 24px;
    background-color: black;
    border-radius: 6px;
    transition: 0.5s;
  }
  button:hover {
    border: 3px solid #00adb5;
    transform: scale(1.05);
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
`;
