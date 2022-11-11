import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { clickedAlt, increaseScore, showNext } from '../redux/actions';

class Alternatives extends Component {
  // state = {
  //   setStyle: false,
  //   clicked: false,
  // };

  buttonsStyle = (event) => {
    const { dispatch } = this.props;
    dispatch(showNext());

    dispatch(clickedAlt());
    // this.setState({
    //   setStyle: true,
    //   clicked: true,
    // });

    this.handleScore(event);
  };

  handleScore = (event) => {
    const { dispatch, score, timer, questions, index } = this.props;
    const THREE = 3;
    const TEN = 10;
    const { difficulty } = questions[index];
    console.log(event.target);
    let dif = 1;

    // const right = document.getElementById('right');
    if (event.target.id === 'right') {
      if (difficulty === 'medium') dif = 2;
      if (difficulty === 'hard') dif = THREE;

      const equation = TEN + (timer * dif);

      dispatch(increaseScore(equation));
    }

    console.log(score);
  };

  render() {
    const { index, questions, timer, setStyle, clicked } = this.props;
    // const { setStyle, clicked } = this.state;
    return (
      <div>
        <p data-testid="question-category">{questions[index].category}</p>
        <p data-testid="question-text">{questions[index].question}</p>
        {questions[index].type === 'boolean' ? (
          <section data-testid="answer-options" id="section">
            <button
              data-testid="wrong-answer-0"
              type="button"
              onClick={ (event) => this.buttonsStyle(event) }
              className={ `alt ${setStyle ? 'red' : ''}` }
              disabled={ timer === 0 || clicked }
            >
              {questions[index].incorrect_answers[0]}
            </button>
            <button
              data-testid="correct-answer"
              id="right"
              type="button"
              onClick={ (event) => this.buttonsStyle(event) }
              className={ `alt ${setStyle ? 'green' : ''}` }
              disabled={ timer === 0 || clicked }
            >
              {questions[index].correct_answer}
            </button>
          </section>
        ) : (
          <section data-testid="answer-options" id="section">
            {questions[index].incorrect_answers.map((item, idx) => (
              <button
                key={ idx }
                data-testid={ `wrong-answer-${idx + 1}` }
                type="button"
                onClick={ (event) => this.buttonsStyle(event) }
                className={ `alt ${setStyle ? 'red' : ''}` }
                disabled={ timer === 0 || clicked }
              >
                { item }
              </button>
            ))}
            <button
              data-testid="correct-answer"
              id="right"
              type="button"
              onClick={ (event) => this.buttonsStyle(event) }
              className={ `alt ${setStyle ? 'green' : ''}` }
              disabled={ timer === 0 || clicked }
            >
              { questions[index].correct_answer}
            </button>
          </section>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.player.timer,
  score: state.player.score,
  setStyle: state.player.setStyle,
  clicked: state.player.clicked,
});

Alternatives.propTypes = {
  index: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  timer: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  clicked: PropTypes.bool.isRequired,
  setStyle: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Alternatives);
