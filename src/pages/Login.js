import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  handleClick = () => {
    const { history } = this.props;
    // const { name, email } = this.state;

    history.push('./settings');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, email } = this.state;
    const test = /\w+@\w+.com/;
    const nameLength = 1;
    const botãoAberto = (test.test(email) && name.length >= nameLength);
    return (
      <div>
        <input
          name="name"
          type="text"
          data-testid="input-player-name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          name="email"
          type="email"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ !botãoAberto }
        >
          Play
        </button>
        <button
          data-testid="settings-title"
          type="submit"
          onClick={ this.handleClick }
        >
          settings
        </button>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

// const mapDispatchToProps = (dispatch) => ({});
export default Login;
