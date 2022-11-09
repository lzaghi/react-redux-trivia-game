import React from 'react';
import { useHistory } from 'react-router-dom';

export default function SettingsBtn() {
  const history = useHistory();

  function handdleClick() {
    history.push('/settings');
  }

  return (
    <button
      type="button"
      data-testid="btn-settings"
      onClick={ handdleClick }
    >
      Settings

    </button>
  );
}
