import React from "react";
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

import axios from 'axios';

// core components
import Navbar from "components/Navbars/Navbar.jsx";

class AddProduct extends React.Component {
  constructor (props) {
    super(props)

    this.addProduct = this.addProduct.bind(this)
    this.state = {
      squares1to6: "",
      squares7and8: "",
      product: {
        name: '',
        price: '',
        is_available: '',
        img_url: '',
        manufacturer_id: '',
        category_id: ''
      },
      manufacturers: [],
      categories: [],
      showAlert: false,
      errorMessage: ''
    };
  }

  async componentWillMount () {
    this.setState({
      manufacturers: await this.fetchManufacturers(),
      categories: await this.fetchCategories()
    })
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
    const product = this.state.product
    this.setState({ product: Object.assign(product, data) })
  }

  async fetchManufacturers () {
    try {
      const manufacturers = await axios.get(`${process.env.REACT_APP_API_URL}/manufacturers`)
      return manufacturers.data
    } catch (e) {
      console.error(e.message)
    }
    return []
  }

  async fetchCategories () {
    try {
      const categories = await axios.get(`${process.env.REACT_APP_API_URL}/categories`)
      return categories.data
    } catch (e) {
      console.error(e.message)
    }
    return []
  }

  async addProduct () {
    if (this.inputIsValid()) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${this.props.userId}/products`, this.state.product)
        if (response.status === 201) this.props.history.push('/admin-products')
        else this.toggleErrorAlert('An internal server error occured.')
      } catch (e) {
        console.error(e.message)
        this.toggleErrorAlert('There was a problem adding the product.')
      }
    } else this.toggleErrorAlert('Invalid form submission.')
  }

  inputIsValid = () => {
    return Object.keys(this.state.product).reduce((acc, key) => acc && this.state.product[key].length > 0, true)
  }

  toggleErrorAlert = (message) => {
    const THREE_SECONDS = 3000
    this.setState({ showAlert: true, errorMessage: message })
    setTimeout(_ => { this.setState({ showAlert: false, errorMessage: '' }) }, THREE_SECONDS)
  }

  render() {
    return (
      <>
        <Navbar history={ this.props.history }/>
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
                        <CardTitle tag="h4">Add Product</CardTitle>
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
                              id="name"
                              onChange={ this.handleInputChange }
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-map-big" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Price"
                              type="text"
                              id="price"
                              onChange={ this.handleInputChange }
                            />
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" id="is_available" onChange={ this.handleInputChange }>
                              <option>Please set item availability...</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </Input>
                          </InputGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-bold" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Path to image"
                              type="text"
                              id="img_url"
                              onChange={ this.handleInputChange }
                            />
                          </InputGroup>
                          <InputGroup>
                            <Input type="select" id="manufacturer_id" onChange={ this.handleInputChange }>
                              <option>Please select a manufacturer...</option>
                              { this.state.manufacturers.map(manufacturer => (<option key={ manufacturer.id } value={ manufacturer.id }>{ manufacturer.name }</option>))}
                            </Input>
                          </InputGroup>
                          <InputGroup>
                            <Input type="select" id="category_id" onChange={ this.handleInputChange }>
                              <option>Please select a category...</option>
                              { this.state.categories.map(category => (<option key={ category.id } value={ category.id }>{ category.name }</option>))}
                            </Input>
                          </InputGroup>
                          { this.state.showAlert && (<p style={{ color: "crimson" }}>{ this.state.errorMessage }</p>)}
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <Button className="btn-round" color="primary" size="lg" onClick={ this.addProduct }>
                          Add
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

const mapStateToProps = state => {
  return { userId: state.user.id }
}

export default connect(mapStateToProps)(AddProduct);