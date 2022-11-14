import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetGame } from '../redux/actions';

class Ranking extends Component {
  handleReset = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(resetGame());
  };

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {console.log(JSON.parse(localStorage.getItem('ranking')))}
        <section id="section">
          {
            JSON.parse(localStorage.getItem('ranking'))
              .map((pessoa, index) => (
                <div key={ index }>
                  <p data-testid={ `player-score-${index}` }>{pessoa.score}</p>
                  <p data-testid={ `player-name-${index}` }>{pessoa.name}</p>
                  <img src={ pessoa.picture } alt="fotoGravatar" />
                </div>
              ))
          }
        </section>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleReset }
        >
          Início
        </button>
      </>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
