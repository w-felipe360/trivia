import React from 'react';
import { getByPlaceholderText, screen, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Settings from '../pages/Settings';
import App from '../App';
import { renderWithRouterAndReduxLegal } from './helpers/renderWith';

// console.log(screen.logTestingPlaygroundURL()); 

describe('testes do Login', () => {
    test('teste se a página de Login é possui um elemento para nome', () => {
        renderWithRouterAndRedux(<Login />);
        const nome = screen.getByPlaceholderText('nome');
        expect(nome).toBeInTheDocument();
    })
    test('teste se a página de Login possui um elemento para e-mail', () =>{
        renderWithRouterAndRedux(<Login />);
      const email = screen.getByPlaceholderText('e-mail');
      expect(email).toBeInTheDocument();
    })
    test('teste se a página de Login possui um botão Play', () =>{
        renderWithRouterAndRedux(<Login />);
      const botaoplay = screen.getByRole('button', {
        name: /play/i
      })
      expect(botaoplay).toBeInTheDocument();
    });
  test(`Teste se ao clicar no botão play, é feita requisição para a API para obter o token e 
  redirecionar a pessoa para tela de jogo`, async () => {
    renderWithRouterAndRedux(<App />);
    const botaoplay = screen.getByRole('button', {
        name: /play/i
      });
      const nome = screen.getByPlaceholderText('nome');
      const email = screen.getByPlaceholderText('e-mail');
      expect(botaoplay).toBeDisabled();
      userEvent.type(nome, "Roberto Carlos");
      userEvent.type(email, "nada@gmail.com");
      expect(botaoplay).not.toBeDisabled();
      userEvent.click(botaoplay);
      const loading = screen.getByText(/carregando/i);
      expect(loading).toBeInTheDocument();


  })

    test('teste se ao clicar no botão settings, a página é redirecionada para ./settings', () =>{
      const { history } = renderWithRouterAndReduxLegal(<App />);
  const settings = screen.getByTestId('btn-settings')
  userEvent.click(settings);
  const { pathname } = history.location;
  expect(pathname).toBe('/settings');
    const textao = screen.getByRole('heading', {
    name: /settings/i
  })
  expect(textao).toBeInTheDocument();
    });
  test('teste de requisição do play', async () => {
  renderWithRouterAndReduxLegal(<App />);
  const botaoplay = screen.getByRole('button', {
    name: /play/i
  });
    const nome = screen.getByPlaceholderText('nome');
    const email = screen.getByPlaceholderText('e-mail');
    userEvent.type(nome, "Roberto Carlos");
    userEvent.type(email, "nada@gmail.com");
    userEvent.click(botaoplay);
    
    await waitFor(() => {
      userEvent.click(botaoplay)
    })
  const paginaJogo = await screen.findByText('Página do Jogo');
  expect(paginaJogo).toBeInTheDocument();
    const myToken = localStorage.getItem('token', '8e902e0746818afd7812bb7cf0b011fc3974293333317596af9152700b08ce99')
    expect(myToken).toBeDefined();
  })
})