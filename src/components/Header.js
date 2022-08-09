import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
    const formatEmail = email.trim(); // .trim() remove os espaços em branco do inicio e do final da string.
    formatEmail.toLowerCase(); // transforma toda a string para minusculo.
    const hash = md5(formatEmail).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          data-testid="header-profile-picture"
          alt="Gravatar"
        />
        <p data-testid="header-player-name">
          { name }
        </p>
        <div data-testid="header-score">
          {score}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  name: store.player.name,
  score: store.player.score,
  email: store.player.email,
});
export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
}.isRequired;
