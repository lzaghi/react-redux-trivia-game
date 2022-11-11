import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertionsScore } = this.props;
    const minimumScore = 3;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          { assertionsScore >= minimumScore ? 'Well Done!' : 'Could be better...' }
        </p>
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  assertionsScore: state.player.assertions,
});

Feedback.propTypes = {
  assertionsScore: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Feedback);
