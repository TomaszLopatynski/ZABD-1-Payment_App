import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import ProfileCards from "./components/profilecards.component";
import ProfileTransactions from "./components/profiletransactions.component";
import Payment from "./components/payment.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
        <Router>
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to={"/"} className="navbar-brand">
                PaymentApp
              </Link>
              <div className="navbar-nav mr-auto">

                <li className="nav-item">
                  <Link to={"/payment"} className="nav-link">
                    Payment
                  </Link>
                </li>
              </div>

              {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/profilecards/:id"} className="nav-link">
                        Your Cards
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/profiletransactions/:id"} className="nav-link">
                        Your Transactions
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href={"/"} className="nav-link" onClick={this.logOut}>
                        LogOut
                      </a>
                    </li>
                  </div>
              ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                      </Link>
                    </li>
                  </div>
              )}
            </nav>

            <div className="container mt-3">
              <Switch>
                <Route exact path={["/login"]} component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profilecards/:id" component={ProfileCards} />
                <Route exact path="/profiletransactions/:id" component={ProfileTransactions} />
                <Route path={["/", "/payment"]} component={Payment} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
