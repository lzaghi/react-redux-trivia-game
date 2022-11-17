import React from 'react';
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import { questions } from './helpers/questionsMock';

describe('testa página de game', () => {
  jest.setTimeout(40000);
  it('testa se token inválido/vazio redireciona para página de login', async () => {
    const { history } = renderWithRouterAndRedux(<App />)

    act(() => history.push('/game'))
    expect(history.location.pathname).toBe('/game');

    await new Promise((response) => {
        setTimeout(() => {
            response();
        }, 5000);
    });

    expect(localStorage.getItem('token')).toBe(null)
    expect(history.location.pathname).toBe('/');
  });

  it('testa timer', async () => {
    renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const jogar = screen.getByTestId('btn-play');
    
    userEvent.type(name, 'Test');
    userEvent.type(email, 'email@test.com');
    userEvent.click(jogar)

    await new Promise((response) => {
        setTimeout(() => {
            response();
        }, 5000);
    });

    expect(screen.getByTestId('timer')).toBeInTheDocument();

    await new Promise((response) => {
        setTimeout(() => {
            response();
        }, 31000);
    });
  })

  it('testa se clique em Next avança alternativas como esperado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions),
    });

    const {history} = renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const jogar = screen.getByTestId('btn-play');
    
    userEvent.type(name, 'test');
    userEvent.type(email, 'email@test.com');
    userEvent.click(jogar)

    await new Promise((response) => {
        setTimeout(() => {
            response();
        }, 5000);
    });

    expect(screen.getByTestId('question-text')).toBeInTheDocument();
    
    const jogada = async (testID) => {
      await waitFor(() => {
        expect(screen.queryByTestId('correct-answer')).toBeDefined();
      })

      const alternative = screen.getByTestId(testID);
      userEvent.click(alternative)
      
      const next = screen.getByTestId('btn-next');
      userEvent.click(next);
    }

    await jogada('wrong-answer-0');
    await jogada('correct-answer');
    await jogada('correct-answer');
    await jogada('wrong-answer-1');
    await jogada('correct-answer');

    expect(history.location.pathname).toBe('/feedback');
  });

  it('cobetura de linhas para localStorage e ranking', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions),
    });

    const {history} = renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const jogar = screen.getByTestId('btn-play');
    
    userEvent.type(name, 'test');
    userEvent.type(email, 'email@test.com');
    userEvent.click(jogar)

    await new Promise((response) => {
        setTimeout(() => {
            response();
        }, 5000);
    });

    expect(screen.getByTestId('question-text')).toBeInTheDocument();
    
    const jogada = async (testID) => {
      await waitFor(() => {
        expect(screen.queryByTestId('correct-answer')).toBeDefined();
      })

      const alternative = screen.getByTestId(testID);
      userEvent.click(alternative)
      
      const next = screen.getByTestId('btn-next');
      userEvent.click(next);
    }

    await jogada('wrong-answer-0');
    await jogada('correct-answer');
    await jogada('correct-answer');
    await jogada('wrong-answer-1');

    localStorage.setItem('ranking', JSON.stringify([
          {
            name: 'player',
            score: '35',
            picture: 'www.gravatar.com/foto',
          }
        ]))

    await jogada('correct-answer');

    const arrayOrdenado = JSON.parse(localStorage.getItem('ranking'));
    expect(arrayOrdenado[0].name).toBe('test')
    expect(arrayOrdenado[1].name).toBe('player')

    expect(history.location.pathname).toBe('/feedback');

    const ranking = screen.getByTestId('btn-ranking');
    expect(ranking).toBeInTheDocument();
    userEvent.click(ranking);
  });
})
