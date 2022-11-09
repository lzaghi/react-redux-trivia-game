import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const {
      email,
      name,
      score,
    } = this.props;
    const emailMd5 = md5(email).toString();
    return (
      <>
        <img src={ `https://www.gravatar.com/avatar/${emailMd5}` } alt="avatar" />
        <div>{ name }</div>
        <div>{ score }</div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
