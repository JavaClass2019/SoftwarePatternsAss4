import React from "react";
import classnames from "classnames";
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

import axios from 'axios';

// core components
import Navbar from "components/Navbars/Navbar.jsx";

class AddUser extends React.Component {
  constructor (props) {
    super(props)

    this.addUser = this.addUser.bind(this)
    this.state = {
      squares1to6: "",
      squares7and8: "",
      user: {
        fullname: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      showAlert: false,
      errorMessage: ''
    };
  }

  componentDidMount () {
    document.body.classList.toggle("register-page");
  }

  componentWillUnmount () {
    document.body.classList.toggle("register-page");
  }

  handleInputChange = (event) => {
    const data = {}
    data[event.target.id] = event.target.value
    const user = this.state.user
    this.setState({ user: Object.assign(user, data) })
  }

  async addUser () {
    if (this.inputIsValid()) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/admin`, this.state.user)
        if (response.status === 201) this.props.history.push('/admin-products')
        else this.toggleErrorAlert('An internal server error occured.')
      } catch (e) {
        console.error(e.message)
        this.toggleErrorAlert('There was a problem registering you.')
      }
    } else this.toggleErrorAlert('Invalid form submission.')
  }

  inputIsValid = () => {
    return Object.keys(this.state.user).reduce((acc, key) => acc && this.state.user[key].length > 0, true)
  }

  toggleErrorAlert = (message) => {
    const THREE_SECONDS = 3000
    this.setState({ showAlert: true, errorMessage: message })
    setTimeout(_ => { this.setState({ showAlert: false, errorMessage: '' }) }, THREE_SECONDS)
  }

  render() {
    return (
      <>
        <Navbar history={ this.props.history } />
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
                        <CardTitle tag="h4">Add User</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form className="form">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-bold" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Name"
                              type="text"
                              id="fullname"
                              onChange={ this.handleInputChange }
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="email"
                              id="email"
                              onChange={ this.handleInputChange }
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
                              id="password"
                              onChange={ this.handleInputChange }
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Confirm password"
                              type="text"
                              id="password_confirmation"
                              onChange={ this.handleInputChange }
                            />
                          </InputGroup>
                          { this.state.showAlert && (<p style={{ color: "crimson" }}>{ this.state.errorMessage }</p>)}
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <Button className="btn-round" color="primary" size="lg" onClick={ this.addUser }>
                          + Add
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

export default AddUser;