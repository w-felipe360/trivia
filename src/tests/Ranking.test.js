import React from "react";
import Ranking from "../pages/Ranking";
import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Fazendo testes basicos no Ranking', () => {
  test('se há um elemento que mostra o score do jogador.', () => {
    renderWithRouterAndRedux(<Ranking />);
    const scoreGame = screen.getByTestId('header-score');
    const gravatar = screen.getByTestId('header-profile-picture')
    const PlayerName = screen.getByTestId('header-player-name')

    expect(scoreGame).toBeInTheDocument();
    expect(gravatar).toBeInTheDocument();
    expect(PlayerName).toBeInTheDocument();
})
  test('Texta se  "ranking" esta sendo exibida e se o botão esta na tela ', () => {
    renderWithRouterAndRedux(<Ranking />);
    const buttonReturn = screen.getByRole('button', {
      name: /Back to Login/i
    })
    const rankingTitle = screen.getByRole('heading', {
      name: /ranking/i
    })
    expect(rankingTitle).toBeDefined()
    expect(buttonReturn).toBeDefined()
  })
  test('Quantos pontos a pessoa recebe', () => {
    
  })
})