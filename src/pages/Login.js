import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './CSS/cssLogin.css';
import { getToken, setLocalStorage } from '../services/requestAPI';
import { gravatarAction, userLoginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      isLoading: false,
    };
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('./settings');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClickAPI = async () => {
    const { history } = this.props;
    const { isLoading } = this.state;
    this.setState({ isLoading: !isLoading }, () => { });
    const returnAPI = await getToken();
    setLocalStorage(returnAPI.token);
    this.setState({ isLoading: !isLoading }, () => { });
    history.push('/game');
  }

  render() {
    const { name, gravatarEmail, isLoading } = this.state;
    const { userLogin, userEmail } = this.props;
    const removeSpace = gravatarEmail.replace(' ', '');
    const test = /\w+@\w+.com/;
    const nameLength = 1;
    const botãoAberto = (test.test(removeSpace) && name.length >= nameLength);
    if (isLoading) return <div>Carregando...</div>;
    return (
      <div className="login_container">

        <form>
          <input
            placeholder="Nome"
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <input
            placeholder="E-mail"
            name="gravatarEmail"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ !botãoAberto }
            onClick={ () => {
              this.handleClickAPI();
              userLogin(name);
              userEmail(gravatarEmail);
            } }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="submit"
            onClick={ this.handleClick }
          >
            Settings
          </button>
        </form>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userLogin: PropTypes.func.isRequired,
  userEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (name) => dispatch(userLoginAction(name)),
  userEmail: (gravatarEmail) => dispatch(gravatarAction(gravatarEmail)),
});

export default connect(null, mapDispatchToProps)(Login);
