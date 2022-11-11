import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alternatives from '../components/Alternatives';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { hideNext, resetAlt } from '../redux/actions';
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

  handleClick = () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
    }));

    const { dispatch, history } = this.props;
    dispatch(hideNext());
    dispatch(resetAlt());

    const FOUR = 4;
    const { index } = this.state;
    if (index === FOUR) history.push('/feedback');
  };

  render() {
    const { index, questions } = this.state;
    const { next } = this.props;
    console.log(questions);

    return (
      <>
        <Header />
        {questions.length > 0 ? (
          <>
            <Timer />
            <Alternatives
              index={ index }
              questions={ questions }
            />
            { next && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleClick }
              >
                Next
              </button>
            )}
          </>
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
  next: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isLoading: state.token.isLoading,
  token: state.token.token,
  next: state.player.next,
});

export default connect(mapStateToProps)(Game);
