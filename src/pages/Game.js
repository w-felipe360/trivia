import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions } from '../services/requestAPI';
import Timer from '../components/Timer';
import { assertionsAction, scoreAction, setResetTimer } from '../redux/actions';

class Game extends React.Component {
  state = {
    perguntas: [],
    position: 0,
    showNext: false,
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
      const buttonIncToArray = Array.from(buttonIncorrect);
      const buttonCorToArray = Array.from(buttonCorrect);
      buttonIncToArray.map((button) => {
        button.disabled = true;
        return button;
      });
      buttonCorToArray.map((button) => {
        button.disabled = true;
        return button;
      });
    }
  }

  handleClick = ({ target }) => {
    const { name } = target;
    if (name === 'correct_answer') {
      const { saveScore, timer, saveAssertions } = this.props;
      let acc = 0;
      const NumberScore = 10;
      const difficulty = this.consegueOsPontos();
      const scorePoints = Number(NumberScore + (timer * difficulty));
      if (difficulty !== 0) {
        acc += scorePoints;
      }
      saveScore(acc);
      saveAssertions();
    }
    // https://developer.mozilla.org/pt-BR/docs/Web/API/Document/getElementsByClassName
    // https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
    const buttonIncorrect = document.getElementsByClassName('answersInc');
    const buttonCorrect = document.getElementsByClassName('answersCor');
    const buttonIncToArray = Array.from(buttonIncorrect);
    const buttonCorToArray = Array.from(buttonCorrect);
    buttonIncToArray.map((button) => {
      const redBorder = '3px solid red';
      button.style.border = redBorder;
      return button;
    });
    buttonCorToArray.map((button) => {
      const greenBorder = '3px solid rgb(6, 240, 15)';
      button.style.border = greenBorder;
      return button;
    });
    this.setState({
      showNext: true,
    });
  }

  handleClickNext = () => {
    const quatro = 4;
    const { position } = this.state;
    const { history, resetTimer } = this.props;
    if (position !== quatro) {
      this.setState({
        position: position + 1,
      });
    }

    this.setState({
      showNext: false,
    });
    resetTimer();

    if (position === quatro) {
      history.push('/feedback');
    }
  }

  gambiarra = (index) => {
    const testid = `wrong-answer-${index}`;
    return testid;
  }

  randomizaResposta = () => {
    const { perguntas, position } = this.state;
    const respostaCorreta = (
      <button
        key={ perguntas[0]?.correct_answer }
        type="submit"
        name="correct_answer"
        data-testid="correct-answer"
        className="answersCor"
        onClick={ this.handleClick }
      >
        { perguntas[position]?.correct_answer }
      </button>
    );
    const respostasIncorretas = perguntas[position]?.incorrect_answers.map(
      (item, index) => (
        <button
          key={ item + index }
          type="submit"
          data-testid={ this.gambiarra(index) }
          className="answersInc"
          onClick={ this.handleClick }
        >
          {item}
        </button>
      ),
    );
    // respostasIncorretas.splice(3, 0, respostaCorreta)
    const array1 = [respostaCorreta, ...respostasIncorretas];
    const array2 = [...respostasIncorretas, respostaCorreta];
    const randomize = Math.random();
    const fifty = 0.50;
    if (randomize > fifty) {
      return array1;
    } return array2;
  }

  consegueOsPontos = () => {
    const { perguntas } = this.state;
    const { difficulty } = perguntas;
    const EasyScore = 1;
    const MediumScore = 2;
    const HardScore = 3;

    if (difficulty === 'easy') {
      return EasyScore;
    }
    if (difficulty === 'medium') {
      return MediumScore;
    } return HardScore;
  }

  render() {
    const { perguntas, position, showNext } = this.state;
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
        {
          showNext ? (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.handleClickNext }
            >
              Next
            </button>
          )
            : ''
        }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveScore: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  saveAssertions: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  score: store.player.score,
  timer: store.player.timer,
});

const mapDispatchToProps = (dispatch) => ({
  saveScore: (score) => dispatch(scoreAction(score)),
  resetTimer: () => dispatch(setResetTimer()),
  saveAssertions: () => dispatch(assertionsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
