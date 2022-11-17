import React from 'react';
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe('Testa a tela de Login', () => {
  jest.setTimeout(30000);
  it('Verifica se estamos na tela de Login', () => {
    const { history: { location } } = renderWithRouterAndRedux(<App />);
    expect(location.pathname).toBe('/');
  })
  it('Verifica se existe o botão "Jogar"', () => {
    renderWithRouterAndRedux(<App />);
    const jogar = screen.getByTestId('btn-play')
    expect(jogar).toBeDefined();
  })
  it('Verifica se existem campos para digitar nome e email', () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name')
    const email = screen.getByTestId('input-gravatar-email')
    expect(name).toBeDefined();
    expect(email).toBeDefined();
  })
  it('Verifica se o botão play está desabilitado inicialmente, mas habilitado quando o usuário digita corretamente em ambas as entradas', () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name')
    const email = screen.getByTestId('input-gravatar-email')
    const jogar = screen.getByTestId('btn-play')
    expect(jogar).toBeDisabled();
    userEvent.type(name, 'Test');
    userEvent.type(email, 'email@test.com');
    expect(jogar).not.toBeDisabled();
  })
  it('Testa se a página muda após o usuário clicar no botão de Play', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name')
    const email = screen.getByTestId('input-gravatar-email')
    const jogar = screen.getByTestId('btn-play')
    expect(history.location.pathname).toBe('/');
    userEvent.type(name, 'Test');
    userEvent.type(email, 'email@test.com');
    userEvent.click(jogar);
    const tempo = 3000;
    await new Promise((carregando) => setTimeout(carregando, tempo));
    expect(history.location.pathname).toBe('/game');
  });
  it('Verifica se o botão "Settings" está na tela', () => {
    renderWithRouterAndRedux(<App />);
    const settings = screen.getByText('Settings')
    expect(settings).toBeDefined();
  })
  it('Testa se a página muda após o usuário clicar no botão de configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settings = screen.getByText('Settings')
    expect(history.location.pathname).toBe('/');
    userEvent.click(settings);
    expect(history.location.pathname).toBe('/settings');
  });

    it('testa se imprime "Algo deu errado" quando erro é lançado', async () => {
    renderWithRouterAndRedux(<App />, { token: { error: true }});

    expect(screen.getByText('Algo deu errado!')).toBeInTheDocument();
  });
})