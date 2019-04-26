import React from "react";
import classnames from "classnames";

import { connect } from 'react-redux'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import axios from 'axios'

// core components
import LoginNavbar from "components/Navbars/LoginNavbar.jsx";
import { setCurrentUser, setAuthorizationToken } from "../actions";

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)

    this.state = {
      squares1to6: "",
      squares7and8: "",
      email: '',
      password: '',
      showAlert: false,
      errorMessage: ''
    }
  }

  componentDidMount () {
    document.body.classList.toggle("register-page");
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  async handleLogin () {
    if (this.emailIsValid() && this.passwordIsValid()) {
      try {
        const response = await this.login({ email: this.state.email, password: this.state.password })
        if (response.status === 200) {
          this.props.setCurrentUser(response.data)

          if (response.data.role.name === 'Administrator') this.props.history.push('/admin-products')
          else this.props.history.push('/products')
        } else this.toggleErrorAlert('An internal server error occured.')
      } catch (e) {
        console.error(e.message)
        this.toggleErrorAlert('Invalid credentials.')
      }
    } else {
      this.toggleErrorAlert('Please enter a valid email or username.')
    }
  }

  async login (params = {}) {
    return await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, params)
  }

  toggleErrorAlert = (message) => {
    const THREE_SECONDS = 3000
    this.setState({ showAlert: true, errorMessage: message })
    setTimeout(_ => { this.setState({ showAlert: false, errorMessage: '' }) }, THREE_SECONDS)
  }

  emailIsValid () {
    return this.state.email.length > 0
  }

  passwordIsValid () {
    return this.state.password.length > 0
  }

  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  render() {
    return (
      <>
        <LoginNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h4">Login</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form className="form" onSubmit={ this.handleLogin }>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.emailFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="text"
                              onChange={ this.handleEmailChange }
                              onFocus={e => this.setState({ emailFocus: true })}
                              onBlur={e => this.setState({ emailFocus: false })}
                            />
                          </InputGroup>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="text"
                              onChange={ this.handlePasswordChange }
                              onFocus={e =>
                                this.setState({ passwordFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ passwordFocus: false })
                              }
                            />
                          </InputGroup>
                          { this.state.showAlert && (<p style={{ color: "crimson" }}>{ this.state.errorMessage }</p>)}
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <Button className="btn-round" onClick={ this.handleLogin } type="submit" color="primary" size="lg">
                          Login
                        </Button>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />
              </Container>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setAuthorizationToken: token => dispatch(setAuthorizationToken(token))
  }
}

export default connect(null, mapDispatchToProps)(Login)
