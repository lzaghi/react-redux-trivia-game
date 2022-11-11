import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

class Alternatives extends Component {
  state = {
    setStyle: false,
  };

  buttonsStyle = () => {
    this.setState({
      setStyle: true,
    });
  };

  render() {
    const { index, questions, timer } = this.props;
    const { setStyle } = this.state;
    return (
      <div>
        <p data-testid="question-text">{questions[index].question}</p>
        <p data-testid="question-category">{questions[index].category}</p>
        {questions[index].type === 'boolean' ? (
          <section data-testid="answer-options" id="section">
            <button
              data-testid="wrong-answer-0"
              type="button"
              onClick={ this.buttonsStyle }
              className={ `alt ${setStyle ? 'red' : ''}` }
              disabled={ timer === 0 }
            >
              {questions[index].incorrect_answers[0]}
            </button>
            <button
              data-testid="correct-answer"
              type="button"
              onClick={ this.buttonsStyle }
              className={ `alt ${setStyle ? 'green' : ''}` }
              disabled={ timer === 0 }
            >
              {questions[index].correct_answer}
            </button>
          </section>
        ) : (
          <section data-testid="answer-options" id="section">
            <button
              data-testid="wrong-answer-0"
              type="button"
              onClick={ (event) => this.buttonsStyle(event) }
              className={ `alt ${setStyle ? 'red' : ''}` }
              disabled={ timer === 0 }
            >
              { questions[index].incorrect_answers[0]}
            </button>
            <button
              data-testid="wrong-answer-1"
              type="button"
              onClick={ this.buttonsStyle }
              className={ `alt ${setStyle ? 'red' : ''}` }
              disabled={ timer === 0 }
            >
              {questions[index].incorrect_answers[1]}
            </button>
            <button
              data-testid="wrong-answer-2"
              type="button"
              onClick={ this.buttonsStyle }
              className={ `alt ${setStyle ? 'red' : ''}` }
              disabled={ timer === 0 }
            >
              {questions[index].incorrect_answers[2]}
            </button>
            <button
              data-testid="correct-answer"
              type="button"
              onClick={ this.buttonsStyle }
              className={ `alt ${setStyle ? 'green' : ''}` }
              disabled={ timer === 0 }
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
});

Alternatives.propTypes = {
  index: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  timer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Alternatives);
