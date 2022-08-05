import React from 'react';
import PropTypes from 'prop-types';
import { getToken, setLocalStorage } from '../services/requestAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { isLoading } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: !isLoading }, () => { });
    const returnAPI = await getToken();
    setLocalStorage(returnAPI.token);
    this.setState({ isLoading: !isLoading }, () => { });
    history.push('/game');
  }

  render() {
    const { name, email, isLoading } = this.state;

    const test = /\w+@\w+.com/;
    const nameLength = 1;
    const botãoAberto = (test.test(email) && name.length >= nameLength);

    if (isLoading) return <div>Carregando...</div>;
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
          onClick={ this.handleClick }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
