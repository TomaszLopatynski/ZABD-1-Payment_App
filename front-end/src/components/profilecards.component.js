import React, { Component } from "react";
import { connect } from "react-redux";
import {
    retrieveProfileCards,
} from "../actions/profilecards";
import AuthService from "../services/auth.service";


class ProfileCards extends Component {
    constructor(props) {
        super(props);
        this.setActiveCard = this.setActiveCard.bind(this);

        this.state = {
            currentCard: null,
            cards: [],
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.props.retrieveProfileCards(AuthService.getCurrentUser().id)
            .then(result => this.setState({
            cards: result
        }))
    }

    setActiveCard(card, index) {
        this.setState({
            currentCard: card,
            currentIndex: index,
        });
    }

    render() {
        const { currentCard, cards, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Cards List</h4>

                    <ul className="list-group">
                        {cards &&
                        cards.map((card, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveCard(card, index)}
                                key={index}
                            >
                                {card.number}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentCard ? (
                        <div>
                            <h4>Card</h4>
                            <div>
                                <label>
                                    <strong>Number:</strong>
                                </label>{" "}
                                {currentCard.number}
                            </div>
                            <div>
                                <label>
                                    <strong>Expiration Date:</strong>
                                </label>{" "}
                                {currentCard.expDate}
                            </div>
                            <div>
                                <label>
                                    <strong>CVV:</strong>
                                </label>{" "}
                                {currentCard.cvv}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Card...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
    };
};

export default connect(mapStateToProps, {
    retrieveProfileCards
})(ProfileCards);