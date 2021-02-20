import React from 'react';
import './Scoreboard.css';

const Scoreboard: React.FC = () => {
  return (
    <section className="scoreboard">
      <h2 className="scoreboard_title">리더보드</h2>
      <div className="scoreboard_container">
        <div className="scoreboard_top3">
          <div className="top3_item">
            <div className="top3_pos">2</div>
            <h3 className="top3_name">User11111</h3>
            <span className="top3_score">6453</span>
          </div>
          <div className="top3_item first">
            <div className="top3_pos">1</div>
            <h3 className="top3_name">User22222</h3>
            <span className="top3_score">6794</span>
          </div>
          <div className="top3_item">
            <div className="top3_pos">3</div>
            <h3 className="top3_name">User33333</h3>
            <span className="top3_score">6034</span>
          </div>
        </div>
        <div className="scoreboard_list">
          <div className="list_item">
            <div className="list_pos">4</div>
            <h3 className="list_name">User44444</h3>
            <span className="list_score">5980</span>
          </div>
          <div className="list_item">
            <div className="list_pos">5</div>
            <h3 className="list_name">User55555</h3>
            <span className="list_score">5978</span>
          </div>
          <div className="list_item">
            <div className="list_pos">6</div>
            <h3 className="list_name">User66666</h3>
            <span className="list_score">5845</span>
          </div>
          <div className="list_item">
            <div className="list_pos">7</div>
            <h3 className="list_name">User77777</h3>
            <span className="list_score">5799</span>
          </div>
          <div className="list_item">
            <div className="list_pos">8</div>
            <h3 className="list_name">User88888</h3>
            <span className="list_score">5756</span>
          </div>
          <div className="list_item">
            <div className="list_pos">9</div>
            <h3 className="list_name">User99999</h3>
            <span className="list_score">5713</span>
          </div>
          <div className="list_item">
            <div className="list_pos">10</div>
            <h3 className="list_name">User101010</h3>
            <span className="list_score">5674</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scoreboard;
