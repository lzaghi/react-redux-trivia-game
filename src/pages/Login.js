import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchTokenAPI, userLogin } from '../redux/actions';
import SettingsBtn from '../components/SettingsBtn';

class Login extends React.Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.state = {
      name: '',
      email: '',
    };
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  redirectGame = () => {
    const { token, history } = this.props;
    // if (token !== '') {
    localStorage.setItem('token', token);
    history.push('/game');
    // }
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const { email, name } = this.state;
    dispatch(userLogin(email, name));
    await dispatch(fetchTokenAPI());

    this.redirectGame();
  };

  validateInputs() {
    const { name, email } = this.state;
    return name && email;
  }

  render() {
    const { name, email } = this.state;
    const { isLoading, error } = this.props;
    if (error) return 'Algo deu errado!';
    return (
      <div>
        <form>
          <label htmlFor="password">
            Nome
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Digite seu nome"
              value={ name }
              onChange={ this.handleInput }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite o seu e-mail"
              value={ email }
              onChange={ this.handleInput }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !this.validateInputs() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <SettingsBtn />
        </form>
        { isLoading && (<p>Carregando...</p>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.token.isLoading,
  token: state.token.token,
  error: state.token.error,
});

Login.defaultProps = {
  error: null,
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  error: PropTypes.shape(),
};

export default connect(mapStateToProps)(Login);
