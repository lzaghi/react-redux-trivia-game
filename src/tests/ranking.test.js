import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const initialState = {
    token: "mockedToken",
    player: {
      name: "Player",
      score: 0,
      picture: "mockedPicture",
    }
  }

describe('Página de ranking', ()=>{
  it('testa se renderiza elementos a partir do localStorage', () => {
    localStorage.setItem('ranking', JSON.stringify([
      {
        name: 'player',
        score: '35',
        picture: 'www.gravatar.com/foto',
      }
    ]))

    renderWithRouterAndRedux(<App />, initialState, "/ranking");

    const score = screen.getByTestId('player-score-0')
    const name = screen.getByTestId('player-name-0')
    const picture = screen.getByRole('img');

    expect(score).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(picture).toHaveAttribute('src', 'www.gravatar.com/foto')
  })

  it('teste se botão redireciona para página inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, "/ranking");
    
    expect(history.location.pathname).toBe('/ranking')
    
    const button = screen.getByTestId('btn-go-home');
    
    userEvent.click(button);
    
    const { location: { pathname } } = history;
    expect(pathname).toBe('/')
  })
});
