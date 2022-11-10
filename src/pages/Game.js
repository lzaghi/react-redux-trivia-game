import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const mock = [
  {
    category: 'Entertainment: Video Games',
    type: 'boolean',
    difficulty: 'hard',
    question: 'TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy',
    correct_answer: 'False',
    incorrect_answers: [
      'True',
    ],
  },
];

class Game extends Component {
  state = {
    questions: [],
    index: 0,
  };

  async componentDidMount() {
    const { token, history, responseCode } = this.props;
    const RESPONSE_CODE = 3;
    const NUMBER_QUESTIONS = 5;
    if (responseCode === RESPONSE_CODE) {
      localStorage.removeItem('token');
      history.push('/login');
    } else {
      const URL = `https://opentdb.com/api.php?amount=${NUMBER_QUESTIONS}&token=${token}`;
      const request = await fetch(URL);
      const response = await request.json();
      console.log(response);

      this.setState({
        questions: response.results,
      });
    }
  }

  /* componentDidUpdate() {
    const section = document.querySelector('section');
    console.log(section);
    for (let i = section.children.length; i >= 0; i++ ) {
      section.appendChild(section.children[Math.random() * i || 0]);
    }
  } */

  render() {
    const { index, questions } = this.state;
    console.log(questions);
    return (
      <>
        <Header />

        {/*   {questions.length > 0 ? ( */}
        <div>

          <p data-testid="question-text">{mock[index].question}</p>
          <p data-testid="question-category">{mock[index].category}</p>
          {mock[index].type === 'boolean' ? (
            <section>
              <button type="button">False</button>
              <button type="button">True</button>
            </section>
          ) : (
            <section>
              <button type="button">4</button>
              <button type="button">5</button>
              <button type="button">6</button>
              <button type="button">4</button>
            </section>
          )}
        </div>
        {/*     ) : (
          <p>carregando</p>
        )} */}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.token.isLoading,
  token: state.token.token,
  responseCode: state.token.responseCode,
  error: state.token.error,
});
export default connect(mapStateToProps)(Game);
