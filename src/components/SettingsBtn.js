import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SettingsBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handdleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ this.handdleClick }
      >
        Settings

      </button>
    );
  }
}

SettingsBtn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SettingsBtn;
