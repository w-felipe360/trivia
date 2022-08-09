import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions } from '../services/requestAPI';
import Timer from '../components/Timer';
import { connect } from 'react-redux';

class Game extends React.Component {
  state = {
    perguntas: [],
    position: 0,
  }

  componentDidMount = async () => {
    const tokenLocal = localStorage.getItem('token');
    const resultado = await getQuestions(tokenLocal);
    this.setState({ perguntas: resultado.results }, () => { });
  }

  componentDidUpdate = () => {
    const { history, timer } = this.props;
    const { perguntas } = this.state;
    const zero = 0;
    if (perguntas.length === zero) {
      localStorage.removeItem('token');
      history.push('/');
    }

    if (timer === zero) {
      const buttonIncorrect = document.getElementsByClassName('answersInc');
      const buttonCorrect = document.getElementsByClassName('answersCor');
      const buttonIncToArray = Array.from(buttonIncorrect)
      const buttonCorToArray = Array.from(buttonCorrect)
      buttonIncToArray.map((button) => button.disabled = true)
      buttonCorToArray.map((button) => button.disabled = true)
    }
  }

  handleClick = () => {
    // https://developer.mozilla.org/pt-BR/docs/Web/API/Document/getElementsByClassName
    // https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
    const buttonIncorrect = document.getElementsByClassName('answersInc');
    const buttonCorrect = document.getElementsByClassName('answersCor');
    const buttonIncToArray = Array.from(buttonIncorrect)
    const buttonCorToArray = Array.from(buttonCorrect)
    buttonIncToArray.map((button) => button.style.border = '3px solid red')
    buttonCorToArray.map((button) => button.style.border = '3px solid rgb(6, 240, 15)')
  }

  randomizaResposta = () => {
    const { perguntas} = this.state;
    const respostaCorreta = (
      <button
        key={perguntas[0]?.correct_answer}
        type="submit"
        data-testid="correct-answer"
        className='answersCor'
        onClick={ this.handleClick }
      >
    { perguntas[0]?.correct_answer }
    </button>
    )
    const respostasIncorretas = perguntas[0]?.incorrect_answers.map((item, index) => (
      <button
        key={ `${item}${index}` }
        type="submit"
        data-testid={`wrong-answer-${index}`}
        className='answersInc'
        onClick={ this.handleClick }
      >
        {item}
      </button>
    ))
    const array1 = [respostaCorreta, ...respostasIncorretas];
    const array2 = [...respostasIncorretas, respostaCorreta];
    const randomize = Math.random();
    if (randomize > 0.50) {
      return array1
    } return array2
  }

  render() {

    const { perguntas, position } = this.state;

    if (perguntas.length === 0) {
      return (
        <div>
          Página do Jogo
          <Header />
        </div>);
    }
    return (
      <div>
        Página do Jogo
        <Header />
        <Timer />
        <h2 data-testid="question-category">{perguntas[position].category}</h2>
        <p data-testid="question-text">{perguntas[position].question}</p>
        <div data-testid="answer-options">
          {
            this.randomizaResposta()
          }
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (store) => ({
  timer: store.user.timer,
})

export default connect(mapStateToProps)(Game);
