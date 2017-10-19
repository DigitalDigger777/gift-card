/**
 * Created by korman on 08.10.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Config from '../Config';

export default class GroupBuyAmount extends React.Component {
    constructor(props) {
        super(props);
        const config = new Config();
        this.state = {
            id: props.match.params.id,
            baseUrl: config.baseUrl,
            iterator: 0,
            amount: 0
        }
    }

    componentWillMount(){
        const giftCardId = window.localStorage.getItem('order_gift_card_id');

        axios.get(this.state.baseUrl + 'gift-card/rest/gift-card/' + giftCardId)
            .then(result => {
                //console.log(result);
                this.setState({
                    iterator: result.data.giftCardValue/25
                });

                //console.log(this.state.iterator);
                $('#plugin-how-much').modal('show');
            })
            .catch(error => {
                console.log(error);
            });
    }


    pay() {
        const amount = this.state.amount;
        window.localStorage.setItem('order_amount', amount);
        window.localStorage.setItem('isGroupBuy', true);

        if (this.state.token) {
            window.location = '/payment.php';
        } else {
            window.localStorage.setItem('order_process', 1);
            window.location = '/#/login';
        }
    }

    changeHowMach(e) {
        console.log(e.target.value);
        this.setState({
            amount: e.target.value
        });
    }

    render(){
        if (this.state.iterator > 0) {
            ///console.log('sd');
            let options = [];
            for (let i = 1; i <= this.state.iterator; i++) {
                options.push(<option key={i} value={i * 25}>${i * 25}</option>);
            }

            return (
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
                                                    <label for="how-mach" className="col-form-label">How much you want
                                                        to buy: </label>
                                                    <select className="form-control" id="how-mach" name="how-mach" onChange={ e => this.changeHowMach(e) }>
                                                        {options}
                                                    </select>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        <button className="btn btn-success gift-card-cart-btn-pay"
                                                style={{width: '100%'}} onClick={this.pay.bind(this)}>Pay
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    Load...
                </div>
            );
        }
    }
}
