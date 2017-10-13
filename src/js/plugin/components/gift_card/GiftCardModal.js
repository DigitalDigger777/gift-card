/**
 * Created by korman on 06.10.17.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Config from '../Config';
import axios from 'axios';


export default class GiftCardModal extends React.Component {
    
    constructor(props){
        super(props);
        console.log(props);
        const config = new Config();

        this.state = {
            // id: props.match.params.id,
            token: window.localStorage.getItem('token'),
            shopperId: props.match.params.shopperId,
            shopper: '',
            baseUrl: config.baseUrl,
            items: [],
            amount: 0
        }
    }

    componentWillMount(){

        if (this.state.token) {
            axios.get(this.state.baseUrl + 'gift-card/rest/gift-card', {
                params: {
                    method: 'LIST',
                    shopperId: this.state.shopperId
                }
            })
                .then(response => {
                    console.log(response.data);
                    const items = [
                        response.data[0],
                        response.data[1]
                    ];

                    this.setState({
                        items: items
                    });
                    $('#plugin').modal('show');
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            window.localStorage.setItem('order_process', 1);
            window.localStorage.setItem('order_shopper_id', this.state.shopperId);
            window.location = '/#/login';
        }

    }

    startGroupBuy(e, id){
        $('#plugin').modal('hide');
        $('#plugin-how-much').modal('show');
        window.localStorage.setItem('order_gift_card_id', id);
    }

    buyNow(e, giftCardValue, id) {
        window.localStorage.removeItem('isGroupBuy');
        window.localStorage.setItem('order_amount', giftCardValue);
        window.localStorage.setItem('order_gift_card_id', id);
        window.location = 'https://drizzle.jjpanda.com/payment.php';
    }

    pay() {
        const amount = this.state.amount;
        window.localStorage.setItem('order_amount', amount);
        window.localStorage.setItem('isGroupBuy', true);
        window.location = 'https://drizzle.jjpanda.com/payment.php';
    }

    changeHowMach(e) {
        this.setState({
            amount: e.target.value
        });
    }

    render(){
        if (this.state.items.length > 0) {
            return (
                <div>
                    <div className="modal w-100" id="plugin">
                        <div className="modal-dialog" role="document" style={{maxWidth: '90%'}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Drizzle: Buy Gift Card with friends and saving!</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                {this.state.items.map(item =>
                                                    <div className="col" key={item.id}>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="card gift-card">
                                                                    <div className="card-body">
                                                                        <h4>{item.shopper.name}<br/>Gift Card</h4>
                                                                        <p>${item.giftCardValue}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row gift-card-row center">
                                                            <div className="col">
                                                                Sell: ${item.giftCardValue}
                                                            </div>
                                                        </div>
                                                        <div className="row gift-card-row">
                                                            <div className="col">
                                                                <button className="btn btn-success btn-gift-card" onClick={(e, giftCardValue, id) => this.buyNow(e, item.giftCardValue, item.id) } >
                                                                    Buy Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="row gift-card-row">
                                                            <div className="col">
                                                                <div className="or">
                                                                    <span>or</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row gift-card-row">
                                                            <div className="col">
                                                                <button className="btn btn-success btn-gift-card" onClick={(e, id) => this.startGroupBuy(e, item.id)}>
                                                                    Start a Group Buy
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row gift-card-row center">
                                                <div className="col">
                                                    <h4>Other Amount</h4>
                                                </div>
                                            </div>
                                            <div className="row gift-card-row center">
                                                <div className="col">
                                                    <span className="amount">$25</span>
                                                </div>
                                                <div className="col">
                                                    <span className="amount">$50</span>
                                                </div>
                                                <div className="col">
                                                    <span className="amount">$75</span>
                                                </div>
                                            </div>
                                            <div className="row gift-card-row center">
                                                <div className="col">
                                                    <button className="btn btn-success">Buy Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row gift-card-row">
                                        <div className="col">
                                            <h4>Group Buy</h4>
                                        </div>
                                        <div className="w-100"></div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-2">
                                                    <div className="circle">1</div>
                                                </div>
                                                <div className="col circle-text">
                                                    Enter amount
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-2">
                                                    <div className="circle">2</div>
                                                </div>
                                                <div className="col circle-text">
                                                    Invite friends buy Together
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-2">
                                                    <div className="circle">3</div>
                                                </div>
                                                <div className="col circle-text">
                                                    Reach gift card amount and pay
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="modal w-100" id="plugin-how-much">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Drizzle: Buy Gift Card with friends and saving!</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col">
                                            <form action="">
                                                <div className="form-row">

                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col">
                                                        <label for="amount" className="col-form-label">How much you want to buy: </label>
                                                        <input type="number" className="form-control" id="amount" placeholder="" onChange={ e => this.changeHowMach(e) }/>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-4">
                                            <button className="btn btn-success gift-card-cart-btn-pay" style={{width: '100%'}} onClick={this.pay.bind(this)}>Pay</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>Load...</div>
            )
        }
    }
}