import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alternatives from '../components/Alternatives';
import Header from '../components/Header';
import './game.css';

class Game extends Component {
  state = {
    questions: [],
    index: 0,
  };

  async componentDidMount() {
    const { token, history } = this.props;
    const THREE = 3;
    const FIVE = 5;

    const URL = `https://opentdb.com/api.php?amount=${FIVE}&token=${token}`;
    const request = await fetch(URL);
    const response = await request.json();

    if (response.response_code === THREE) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({
      questions: response.results,
    }, () => {
      const section = document.getElementById('section');

      if (section) {
        console.log('entrou');
        for (let i = section.children.length; i >= 0; i -= 1) {
          section.appendChild(section.children[Math.floor(Math.random() * i)]);
        }
      }
    });
  }

  render() {
    const { index, questions } = this.state;
    console.log(questions);
    return (
      <>
        <Header />

        {questions.length > 0 ? (
          <Alternatives
            index={ index }
            questions={ questions }
          />
        ) : (
          <p>Carregando...</p>
        )}
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  token: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  isLoading: state.token.isLoading,
  token: state.token.token,
});

export default connect(mapStateToProps)(Game);
