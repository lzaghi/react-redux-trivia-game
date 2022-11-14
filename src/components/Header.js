import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePicture } from '../redux/actions';

class Header extends React.Component {
  render() {
    const {
      gravatarEmail,
      name,
      score,
      dispatch,
    } = this.props;
    const emailMd5 = md5(gravatarEmail).toString();

    dispatch(savePicture(`https://www.gravatar.com/avatar/${emailMd5}`));

    return (
      <>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailMd5}` } alt="avatar" />
        <div data-testid="header-player-name">{ name }</div>
        <div data-testid="header-score">{ score }</div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
