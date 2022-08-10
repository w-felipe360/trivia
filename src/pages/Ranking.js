import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Ranking extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <>
        <Header />
        <section>
          <h1 data-testid="ranking-title"> Ranking </h1>
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ this.handleClick }
          >
            Vai Pra Casa

          </button>
        </section>
      </>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
