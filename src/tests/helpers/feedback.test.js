import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../../App';
import Feedback from '../../pages/Feedback';

describe('Página de feedback', ()=>{
    test('1- Verifica se os botões de Play Again e Ranking estão presentes na paǵina', ()=>{
        renderWithRouterAndRedux(<Feedback />)
        const buttonPlay = screen.getByRole('button', { name : /Play Again/i})
        expect(buttonPlay).toBeInTheDocument()
        const buttonRnk = screen.getByRole('button', { name : /Ranking/i})
        expect(buttonRnk).toBeInTheDocument()
    });

    test('2- Verifica se ao clicar no botão de Play Again, a página é redirecionado para o início', ()=>{
        const { history } = renderWithRouterAndRedux(<App />);
        act(()=> {history.push('/feedback');})
        const buttonPlayAgain = screen.getByRole('button', {name : /Play Again/i});
        userEvent.click(buttonPlayAgain);
        const { location : { pathname }} = history;
        expect(pathname).toBe('/');
    });

    test('3- Verifica se ao clicar no botão de Ranking, a página é redirecionada para a de ranking',()=>{
        const { history } = renderWithRouterAndRedux(<App />);
        act(()=>{history.push('/feedback');})
        const buttonRnk = screen.getByRole('button', { name : /Ranking/i});
        userEvent.click(buttonRnk);
        const { location : { pathname}} = history;
        expect(pathname).toBe('/ranking');

    });
})
