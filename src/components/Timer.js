import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { timerDown } from '../redux/actions';

class Timer extends Component {
  componentDidMount() {
    const ONE_SECOND = 1000;
    const { dispatch } = this.props;
    this.intervalID = setInterval(() => {
      const { timer } = this.props;
      dispatch(timerDown(timer));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.timer - 1 === 0) {
      clearInterval(this.intervalID);
    }
  }

  render() {
    const { timer } = this.props;
    return (
      <p data-testid="timer">{ timer }</p>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.player.timer,
});

export default connect(mapStateToProps)(Timer);
