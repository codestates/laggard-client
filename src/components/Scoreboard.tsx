import React from 'react';
import './Scoreboard.css';

const Scoreboard: React.FC = () => {
  return (
    <section className="scoreboard">
      <div className="scoreboard_container">
        <div className="scoreboard_card">
          <div className="scoreboard_box">
            <div className="scoreboard_points">
              <svg>
                <circle cx="70" cy="70" r="70"></circle>
                <circle cx="70" cy="70" r="70"></circle>
              </svg>
              <div className="scoreboard_number">
                <h2>
                  90<span>점</span>
                </h2>
              </div>
            </div>
            <h2 className="scoreboard_user">User1</h2>
          </div>
        </div>
        <div className="scoreboard_card">
          <div className="scoreboard_box">
            <div className="scoreboard_points">
              <svg>
                <circle cx="70" cy="70" r="70"></circle>
                <circle cx="70" cy="70" r="70"></circle>
              </svg>
              <div className="scoreboard_number">
                <h2>
                  90<span>점</span>
                </h2>
              </div>
            </div>
            <h2 className="scoreboard_user">User1</h2>
          </div>
        </div>
        <div className="scoreboard_card">
          <div className="scoreboard_box">
            <div className="scoreboard_points">
              <svg>
                <circle cx="70" cy="70" r="70"></circle>
                <circle cx="70" cy="70" r="70"></circle>
              </svg>
              <div className="scoreboard_number">
                <h2>
                  100<span>점</span>
                </h2>
              </div>
            </div>
            <h2 className="scoreboard_user">User1</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scoreboard;
