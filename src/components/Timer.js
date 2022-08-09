import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimer } from '../redux/actions';

class Timer extends React.Component {
  componentDidMount() {
    const oneSecond = 1000;

    this.intervalID = setInterval(() => {
      this.mudarTimer();
    }, oneSecond);
  }

  componentDidUpdate() {
    const { timer } = this.props;
    const timeLimit = 0;
    if (timer === timeLimit) {
      clearInterval(this.intervalID);
    }
  }

  mudarTimer = () => {
    const { timer, changeTimer } = this.props;
    changeTimer(timer);
  }

  render() {
    const { timer } = this.props;
    return (
      <section>
        <h2>{ timer }</h2>
      </section>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  changeTimer: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  timer: store.user.timer,
});

const mapDispatchToProps = (dispatch) => ({
  changeTimer: (timer) => dispatch(setTimer(timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
