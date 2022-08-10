import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const notaDeFeedback = 3;
    const feedback = assertions < notaDeFeedback ? 'Could be bette... ' : 'Weel Done!';

    return (
      <section>
        <h3 data-testid="feedback-text">{feedback}</h3>
      </section>
    );
  }
}

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};
