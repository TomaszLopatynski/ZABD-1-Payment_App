import React, { Component } from "react";
import { connect } from "react-redux";

import { createCard } from "../actions/cards";
import { createUser } from "../actions/users";
import { createTransactions } from "../actions/transactions";
import {isInt, isDate, isCreditCard, isAlpha} from "validator";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const name = value => {
    if (!isAlpha(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid name.
            </div>
        );
    }
};

const card = value => {
    if (!isCreditCard(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid card.
            </div>
        );
    }
};

const amount = value => {
    if (!isInt(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid amount.
            </div>
        );
    }
};

const date = value => {
    if (!isDate(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid date.
            </div>
        );
    }
};

const cvv = value => {
    if (value.length === 3) {
        return (
            <div className="alert alert-danger" role="alert">
                The CVV must have 3 numbers.
            </div>
        );
    }
};

class Payments extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeOwnerCardNumber = this.onChangeOwnerCardNumber.bind(this);
        this.onChangeExpDate = this.onChangeExpDate.bind(this);
        this.onChangeCVV = this.onChangeCVV.bind(this);
        this.onChangeReceiverCardNumber = this.onChangeReceiverCardNumber.bind(this);
        this.handlePayment = this.handlePayment.bind(this);

        this.state = {
            name: "",
            amount: "",
            ownerCN: "",
            expDate: "",
            cvv: "",
            receiverCN: ""
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onChangeOwnerCardNumber(e) {
        this.setState({
            ownerCN: e.target.value
        });
    }

    onChangeExpDate(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCVV(e) {
        this.setState({
            cvv: e.target.value
        });
    }
    onChangeReceiverCardNumber(e) {
        this.setState({
            receiverCN: e.target.value
        });
    }

    handlePayment() {
        const { name, amount, ownerCN, expDate, cvv, receiverCN } = this.state;

        this.props
            .createCard(ownerCN, expDate, cvv)
            .then((data) => {
                this.setState({
                    ownerCN: data.ownerCN,
                    expDate: data.ownerCN,
                    cvv: data.cvv,

                    submitted: true,
                });
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });

        this.props
            .createUser(name)
            .then((data) => {
                this.setState({
                    name: data.name,

                    submitted: true,
                });
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });

        this.props
            .createTransactions(amount, receiverCN)
            .then((data) => {
                this.setState({
                    amount: data.amount,
                    receiverCN: data.receiverCN,
                    date: Date.now(),

                    submitted: true,
                });
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });


    }

    render() {
        return (
            <div className="submit-form">
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                            name="name"
                            validations={[required, name]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="amount"
                            required
                            value={this.state.amount}
                            onChange={this.onChangeAmount}
                            name="amount"
                            validations={[required, amount]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ownerCN">Owner card number:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ownerCN"
                            required
                            value={this.state.ownerCN}
                            onChange={this.onChangeOwnerCardNumber}
                            name="ownerCN"
                            validations={[required, card]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expDate">Expiration date:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="expDate"
                            required
                            value={this.state.expDate}
                            onChange={this.onChangeExpDate}
                            name="expDate"
                            validations={[required, date]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cvv"
                            required
                            value={this.state.cvv}
                            onChange={this.onChangeCVV}
                            name="cvv"
                            validations={[required, cvv]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="receiverCN">Receiver Card Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="receiverCN"
                            required
                            value={this.state.receiverCN}
                            onChange={this.onChangeReceiverCardNumber}
                            name="receiverCN"
                            validations={[required, card]}
                        />
                    </div>
                    <button onClick={this.handlePayment} className="btn btn-success">
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(null, { createCard, createUser, createTransactions })(Payments);