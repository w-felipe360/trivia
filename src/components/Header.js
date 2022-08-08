import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;
    const hash = md5(email).toString();
    console.log(hash);
    console.log(name);
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          data-testid="header-profile-picture"
          alt="Gravatar"
        />
        <p data-testid="header-player-name">
          { name }
        </p>
        <div data-testid="header-score">
          0
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  name: store.user.name,
  score: store.user.score,
  email: store.user.gravatarEmail,
});
export default connect(mapStateToProps)(Header);
Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
}.isRequired;
