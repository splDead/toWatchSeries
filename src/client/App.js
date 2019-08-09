import React, { Component } from 'react';
import axios from 'axios';

import './app.css';

export default class App extends Component {
  state = {
    username: null,
    email: '',
    password: '',
    success: false
  };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username, success: user.success }));
  }

  handleLogin = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    axios.post('/api/auth/login', { email, password })
        .then(res => {
          if (res.data.success) {
            this.setState({
              success: res.data.success,
              message: null
            });

            axios.get('/api/getUsername')
                .then(res => {
                  this.setState({ username: res.data.username })
                })
          }
        })
        .catch(err => {
          this.setState({
            email: null,
            password: null,
            success: false,
            message: err.response.data.message
          });
        })
  };

  render() {
    const { username, email, password, success, message } = this.state;
    return (
      <div>
        {username
            ? <h1>{`Hello ${username}`}</h1>
            : <h1>Loading.. please wait!</h1>
        }
        {success
          ? <div>
              login successful
            </div>
            : <form>
              <input type='text' name='email' value={email} onChange={event => this.setState({ email: event.target.value })}/>
              <input type='password' name='password' value={password} onChange={event => this.setState({ password: event.target.value })}/>
              <button type='submit' onClick={this.handleLogin}>login</button>
            </form>
        }
        {message && <div>{message}</div>}
      </div>
    );
  }
}
