import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions } from '../services/requestAPI';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayResults: [],
      i: 0,
      respostas: [],
    };
  }

  componentDidMount = async () => {
    this.reqForGetQuestions();
    console.log(this.state);
  }

  handleClick = () => {
    const quatro = 4;
    const { i } = this.state;
    if (i !== quatro) {
      this.setState({
        i: i + 1,
      });
    }
  }

  reqForGetQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('token');
      return history.push('/');
    }
    const resultado = await getQuestions(token);
    console.log(resultado);
    const { results } = resultado;
    this.setState({
      arrayResults: results,
    });
    // arrayResults.
  }

  randomizaResposta = () => {
    const { arrayResults, i} = this.state;
    const respostaCorreta = (
    <button type="submit" data-testid="correct-answer"> 
    { arrayResults[0]?.correct_answer }
    </button>
    )
    const respostasIncorretas = arrayResults[0]?.incorrect_answers.map((item, index) => (
      <button
        key={ `${item}${index}` }
        type="submit"
        data-testid={ `wrong-answer-${i}` }
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
    const { arrayResults, i } = this.state;

    return (
      arrayResults.length > 0 && (

        <div>
          Página do Jogo
          <Header />

          <h1 data-testid="question-category">
            {arrayResults[i].category}
          </h1>
          <p data-testid="question-text">
            {arrayResults[i].question}
          </p>
          <div>
          {
            
            this.randomizaResposta()
            
            // arrayResults.incorrect_answers).map((item, index) => (
            //   <button
            //     key={ `${item}${index}` }
            //     type="submit"
            //     data-testid={ `wrong-answer-${i}` }
            //   >
            //     {item}
            //   </button>
            // ))
          }
          </div>

          <button
            type="submit"
            data-testid="correct-answer"
          >
            {arrayResults[i].correct_answer}
          </button>

          <button
            type="button"
            data-testid={ i }
            onClick={ this.handleClick }
          >
            Próxima pergunta
          </button>
        </div>
      ));
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
