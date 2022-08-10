import React from 'react';
import { screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes da página de feedback', () => {
    test('se há um elemento que mostra o nome do jogador.', () => {
        renderWithRouterAndRedux(<Feedback />);
        const playerName = screen.getByTestId('header-player-name');
        expect(playerName).toBeInTheDocument();
    })
    test('se há um elemento que mostra o score do jogador.', () => {
        renderWithRouterAndRedux(<Feedback />);
        const scoreGame = screen.getByTestId('header-score');
        expect(scoreGame).toBeInTheDocument();
    })
    test('se há um elemento que mostra o score total do jogador.', () => {
        renderWithRouterAndRedux(<Feedback />);
        const totalScoreGame = screen.getByTestId('feedback-total-score');
        expect(totalScoreGame).toBeInTheDocument();
    })
    test('se há um elemento que mostra o score total do jogador.', () => {
        renderWithRouterAndRedux(<Feedback />);
        const totalScoreGame = screen.getByTestId('feedback-total-score');
        expect(totalScoreGame).toBeInTheDocument();
    })   
   test('se há um elemento de texto referente ao score do jogador.', () => {
        renderWithRouterAndRedux(<Feedback />);
        const feedbackText = screen.getByTestId('feedback-text');
        expect(feedbackText).toBeDefined();
    })
    test('se há um elemento que mostra o total de questões.', () => {
        renderWithRouterAndRedux(<Feedback />);
        const totalQuestions = screen.getByTestId('feedback-total-question');
        expect(totalQuestions).toBeInTheDocument();
    })    
    test('se há dois botões.', () => {
        renderWithRouterAndRedux(<Feedback />);
        const playAgainButton = screen.getByTestId('btn-play-again');
        const rankingButton = screen.getByTestId('btn-ranking');
        expect(playAgainButton).toBeInTheDocument();
        expect(rankingButton).toBeInTheDocument();

    })   
    test(`se ao clicar no play again, a página é redirecionada para '/'`, () => {
        const {history} = renderWithRouterAndRedux(<App />);
        history.push('/feedback');
        const playAgainButton = screen.getByTestId('btn-play-again');
        userEvent.click(playAgainButton);
        const input = screen.getByTestId('input-player-name');
        expect(input).toBeInTheDocument();
        
    })
    test(`se ao clicar no botão de ranking, a página é redirecionada para '/ranking'`, () => {
        const {history} = renderWithRouterAndRedux(<App />);
        history.push('/feedback');
        const rankingButton = screen.getByTestId('btn-ranking');
        userEvent.click(rankingButton);
        const rankingTitle = screen.getByTestId('ranking-title');
        expect(rankingTitle).toBeInTheDocument();
        
    })     
})