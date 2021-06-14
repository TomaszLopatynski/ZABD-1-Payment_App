import React, { Component } from "react";
import { connect } from "react-redux";
import {
    retrieveProfileTransactions,
} from "../actions/profiletransactions";
import AuthService from "../services/auth.service";


class ProfileTransactions extends Component {
    constructor(props) {
        super(props);
        this.setActiveTransaction = this.setActiveTransaction.bind(this);

        this.state = {
            currentTransaction: null,
            transactions: [],
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.props.retrieveProfileTransactions(AuthService.getCurrentUser().id)
            .then(result => this.setState({
                transactions: result
            }))
    }

    setActiveTransaction(transaction, index) {
        this.setState({
            currentTransaction: transaction,
            currentIndex: index,
        });
    }

    render() {
        const { currentTransaction, transactions, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Transactions List</h4>

                    <ul className="list-group">
                        {transactions &&
                        transactions.map((transaction, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveTransaction(transaction, index)}
                                key={index}
                            >
                                {transaction.receiverCN}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentTransaction ? (
                        <div>
                            <h4>Card</h4>
                            <div>
                                <label>
                                    <strong>Amount:</strong>
                                </label>{" "}
                                {currentTransaction.amount}
                            </div>
                            <div>
                                <label>
                                    <strong>Receiver card number:</strong>
                                </label>{" "}
                                {currentTransaction.receiverCN}
                            </div>
                            <div>
                                <label>
                                    <strong>Transaction date:</strong>
                                </label>{" "}
                                {currentTransaction.date}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Transaction...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions,
    };
};

export default connect(mapStateToProps, {
    retrieveProfileTransactions
})(ProfileTransactions);