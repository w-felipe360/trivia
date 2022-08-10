import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  onClickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  onCLickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    console.log(assertions);
    const notaDeFeedback = 3;
    const feedback = assertions < notaDeFeedback ? 'Could be better... ' : 'Well Done!';

    return (
      <section>
        <Header />
        <h1 data-testid="feedback-total-score">
          {' '}
          { score }
          {' '}
        </h1>
        <h2 data-testid="feedback-text">
          { feedback }
        </h2>
        <h2 data-testid="feedback-total-question">
          { assertions }
          {' '}
        </h2>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.onClickPlayAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.onCLickRanking }
        >
          Ranking

        </button>
      </section>
    );
  }
}

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
