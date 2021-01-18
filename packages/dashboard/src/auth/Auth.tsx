import React, { Component, ChangeEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import type { RouteComponentProps } from '@reach/router';
import { createStyles, Theme } from '@material-ui/core';
import gql from 'graphql-tag';
import { Mutation, withApollo, WithApolloClient } from 'react-apollo';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import { setActiveUserToken } from './state/auth-actions';
import type { AppState } from '../state/app-state';

interface AuthProps extends RouteComponentProps {}

interface Props
  extends AuthProps,
    WithStyles<typeof styles>,
    ReturnType<typeof mapStateToProps>,
    DispatchProps,
    WithApolloClient<any> {}

const generateAccessTokenMutation = gql(`
  mutation generateAccessToken($username: String!, $password: String!) {
    generateAccessToken(username: $username, password: $password)
  }
`);

const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
      margin: theme.spacing(),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(),
    },
    submit: {
      marginTop: theme.spacing(3),
    },
  });

interface State {
  username: string;
  password: string;
  loggingIn: boolean;
  error?: string;
}

class Auth extends Component<Props, any> {
  state: State = {
    username: '',
    password: '',
    loggingIn: false,
  };

  onChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => this.setState({ [name]: e.target.value });

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="h5">Sign in</Typography>
            <form
              className={classes.form}
              onSubmit={(e) => {
                e.preventDefault();
                const { username, password } = this.state;
                this.setState({
                  loggingIn: true,
                  error: undefined,
                });
                fetch(`${this.props.config.serverUrl}/login`, {
                  method: 'POST',
                  body: JSON.stringify({
                    username,
                    password,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                  .then((res) => {
                    console.log({ res });
                    return res.json();
                  })
                  .then(({ token }: any) => {
                    console.log({ token });
                    this.props.setActiveUserToken(token);
                    this.setState({
                      isLoading: false,
                    });
                    this.props.client.resetStore();
                  })
                  .catch(() => {
                    this.setState({
                      isLoading: false,
                      error: 'Login failed',
                    });
                  });
              }}
            >
              {this.state.error && <Typography>{this.state.error}</Typography>}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  value={this.state.username}
                  onChange={this.onChange('username')}
                  id="username"
                  name="username"
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  value={this.state.password}
                  onChange={this.onChange('password')}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </FormControl>

              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    config: state.config,
  };
}

const mapDispatchToProps = {
  setActiveUserToken,
};

type DispatchProps = typeof mapDispatchToProps;

export default combineContainers(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withApollo
)(Auth) as React.ComponentType<AuthProps>;
