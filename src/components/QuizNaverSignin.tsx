import React, { useEffect } from 'react';
// eslint-disable-next-line
const { naver } = window as any;

const QuizNaverSignin: React.FC = () => {
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: '5tQF0iVwkjDyV_pxq7uO',
      callbackUrl: 'https://laggard-server.ga/quiz',
      isPopup: false,
      loginButton: { color: 'white', type: 5, height: '35' },
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <div className="loginModal">
      <div id="naverIdLogin" />
    </div>
  );
};

export default QuizNaverSignin;
