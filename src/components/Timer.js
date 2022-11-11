import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { timerZero } from '../redux/actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    const { timer } = this.props;
    this.state = {
      timer,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { dispatch } = this.props;
    const { timer } = this.state;
    if (prevState.timer === 1) {
      clearInterval(this.intervalID);
      dispatch(timerZero(timer));
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <p>{ timer }</p>
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
