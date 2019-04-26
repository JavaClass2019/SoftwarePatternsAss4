import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  NavItem,
  NavLink
} from "reactstrap";

import { logout } from '../../actions/index'

class PagesNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent"
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }

  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };

  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };

  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };

  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };

  logout = _ => {
    this.props.logout()
    this.props.history.push('/login')
  }

  render() {
    return (
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand data-placement="bottom" rel="noopener noreferrer">
              <span>Store API </span>
            </NavbarBrand>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Store API
                  </a>
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav navbar>
              <NavItem>
                <NavLink tag={Link} to={ this.props.user.role.name === 'Administrator' ? "/admin-products" : "/products" }>
                  Products
                </NavLink>
              </NavItem>
              { this.props.user.role.name === 'Customer' && (<NavItem>
                <NavLink tag={Link} to="/cart">
                  Cart ({ this.props.numberOfItemsInCart })
                </NavLink>
              </NavItem>)}
              { this.props.user.role.name === 'Customer' && (<NavItem>
                <NavLink tag={Link} to="/purchases">
                  Purchases
                </NavLink>
              </NavItem>)}
              { this.props.user.role.name === 'Administrator' && (<NavItem>
                <NavLink tag={Link} to="/add-product">
                  + Product
                </NavLink>
              </NavItem>)}
              { this.props.user.role.name === 'Administrator' && (<NavItem>
                <NavLink tag={Link} to="/add-manufacturer">
                  + Manufacturer
                </NavLink>
              </NavItem>)}
              { this.props.user.role.name === 'Administrator' && (<NavItem>
                <NavLink tag={Link} to="/add-category">
                  + Category
                </NavLink>
              </NavItem>)}
              { this.props.user.role.name === 'Administrator' && (<NavItem>
                <NavLink tag={Link} to="/add-user">
                  + User
                </NavLink>
              </NavItem>)}
              <NavItem>
                <NavLink onClick={ this.logout }>
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return { numberOfItemsInCart: state.cart.length, user: state.user }
}

const mapDispatchToProps = dispatch  => {
  return { logout: _ => dispatch(logout()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(PagesNavbar);
