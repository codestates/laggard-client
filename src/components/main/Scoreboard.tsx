import React, { useEffect, useState } from 'react';
import './Scoreboard.css';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import axios from 'axios';

const Scoreboard: React.FC = () => {
  // eslint-disable-next-line
  const [ranks, setRanks] = useState<any>('' as any);
  useEffect(() => {
    axios
      .get('https://laggard-server.ga/score/rank', { withCredentials: true })
      .then((res) => {
        const data = res.data;
        setRanks([...ranks, ...data]);
      });
  }, []);

  return (
    <section className="scoreboard">
      <ScrollAnimation offset={100} animateIn="animate__zoomIn" duration={0.4}>
        <h2 className="scoreboard_title">Leaderboard</h2>
      </ScrollAnimation>
      <div className="scoreboard_container">
        <ScrollAnimation offset={130} animateIn="animate__tada" duration={0.8}>
          <div className="scoreboard_top3">
            <div className="top3_item">
              <div className="top3_pos">2</div>
              <h3 className="top3_name">
                {ranks[1] ? ranks[1].nickname : `User2`}
              </h3>
              <span className="top3_score">
                {ranks[1] ? ranks[1].total : `2`}
              </span>
            </div>
            <div className="top3_item first">
              <div className="top3_pos">1</div>
              <h3 className="top3_name">
                {ranks[0] ? ranks[0].nickname : `User1`}
              </h3>
              <span className="top3_score">
                {ranks[0] ? ranks[0].total : `1`}
              </span>
            </div>
            <div className="top3_item">
              <div className="top3_pos">3</div>
              <h3 className="top3_name">
                {ranks[2] ? ranks[2].nickname : `User3`}
              </h3>
              <span className="top3_score">
                {ranks[2] ? ranks[2].total : `3`}
              </span>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation offset={150} animateIn="animate__pulse" duration={1}>
          <div className="scoreboard_list">
            <div className="list_item">
              <div className="list_pos">4</div>
              <h3 className="list_name">
                {ranks[3] ? ranks[3].nickname : `User4`}
              </h3>
              <span className="list_score">
                {ranks[3] ? ranks[3].total : `4`}
              </span>
            </div>
            <div className="list_item">
              <div className="list_pos">5</div>
              <h3 className="list_name">
                {ranks[4] ? ranks[4].nickname : `User5`}
              </h3>
              <span className="list_score">
                {ranks[4] ? ranks[4].total : `5`}
              </span>
            </div>
            <div className="list_item">
              <div className="list_pos">6</div>
              <h3 className="list_name">
                {ranks[5] ? ranks[5].nickname : `User6`}
              </h3>
              <span className="list_score">
                {ranks[5] ? ranks[5].total : `6`}
              </span>
            </div>
            <div className="list_item">
              <div className="list_pos">7</div>
              <h3 className="list_name">
                {ranks[6] ? ranks[6].nickname : `User7`}
              </h3>
              <span className="list_score">
                {ranks[6] ? ranks[6].total : `7`}
              </span>
            </div>
            <div className="list_item">
              <div className="list_pos">8</div>
              <h3 className="list_name">
                {ranks[7] ? ranks[7].nickname : `User8`}
              </h3>
              <span className="list_score">
                {ranks[7] ? ranks[7].total : `8`}
              </span>
            </div>
            <div className="list_item">
              <div className="list_pos">9</div>
              <h3 className="list_name">
                {ranks[8] ? ranks[8].nickname : `User9`}
              </h3>
              <span className="list_score">
                {ranks[8] ? ranks[8].total : `9`}
              </span>
            </div>
            <div className="list_item">
              <div className="list_pos">10</div>
              <h3 className="list_name">
                {ranks[9] ? ranks[9].nickname : `User10`}
              </h3>
              <span className="list_score">
                {ranks[9] ? ranks[9].total : `10`}
              </span>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Scoreboard;
