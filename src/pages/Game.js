import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions } from '../services/requestAPI';

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
    const { history } = this.props;
    const { perguntas } = this.state;
    const zero = 0;
    if (perguntas.length === zero) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  randomizaResposta = () => {
    const { perguntas} = this.state;
    const respostaCorreta = (
      <button key={ perguntas[0]?.correct_answer} type="submit" data-testid="correct-answer">
    { perguntas[0]?.correct_answer }
    </button>
    )
    const respostasIncorretas = perguntas[0]?.incorrect_answers.map((item, index) => (
      <button
        key={ `${item}${index}` }
        type="submit"
        data-testid={ `wrong-answer-${index}` }
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
        <h2 data-testid="question-category">{perguntas[position].category}</h2>
        <p data-testid="question-text">{perguntas[position].question}</p>
        <div data-testid="answer-options">
          {
            this.randomizaResposta()
          /* {perguntas[position].incorrect_answers.map((item, index) => (
            <button
              key={ `${item}${index}` }
              type="submit"
              data-testid={ `wrong-answer-${index}` }
            >
              {item}
            </button>
          ))}
          <button
            type="submit"
            data-testid="correct-answer"
          >
            {perguntas[position].correct_answer}
          </button> */}
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

export default Game;
