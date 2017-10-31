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
            amount: 0,
            iterator: 0,
            status: 'Load...'
        }
    }

    componentWillMount(){

        axios.get(this.state.baseUrl + 'gift-card/rest/gift-card', {
            params: {
                method: 'LIST',
                shopperId: this.state.shopperId
            }
        })
            .then(response => {
                console.log(response.data);

                if (typeof response.data.message != 'undefined') {

                    this.setState({
                        status: response.data.message
                    });

                } else {

                    const items = [
                        response.data[0],
                        response.data[1]
                    ];

                    this.setState({
                        items: items,
                        iterator: response.data.giftCardValue/25
                    });

                }

                $('#plugin').modal('show');
            })
            .catch(error => {
                console.log(error);
            });
    }

    startGroupBuy(e, id){
        //$('#plugin').modal('hide');
        //$('#plugin-how-much').modal('show');
        window.localStorage.setItem('order_gift_card_id', id);
        window.localStorage.setItem('order_shopper_id', this.state.shopperId);
        window.location = '/order.php/#/order/how-much';
    }

    buyNow(e, giftCardValue, id) {

        window.localStorage.removeItem('isGroupBuy');
        window.localStorage.setItem('isBuyNow', 1);
        window.localStorage.setItem('order_amount', giftCardValue);
        window.localStorage.setItem('order_gift_card_id', id);

        if (this.state.token) {

            window.location = '/payment.php';

        } else {

            window.localStorage.setItem('order_process', 1);
            window.localStorage.setItem('order_shopper_id', this.state.shopperId);
            window.location = '/#/login';

        }
    }

    buyNowOtherAmount(e, amount){

        window.localStorage.removeItem('isGroupBuy');
        window.localStorage.setItem('isBuyNow', 1);
        window.localStorage.setItem('order_amount', amount);
        window.localStorage.setItem('order_gift_card_id', 0);

        if (this.state.token) {

            window.location = '/payment.php';

        } else {

            window.localStorage.setItem('order_process', 1);
            window.localStorage.setItem('order_shopper_id', this.state.shopperId);
            window.location = '/#/login';

        }
    }

    selectAmount(e, amount) {

        const _amount = amount ? amount : e.target.value;

        this.setState({
            amount: _amount
        });
    }

    render(){
        if (this.state.items.length > 0) {
            let amounts = [];

            for(let i = 1; i <= 3; i++) {
                amounts.push(
                    <div key={i} className="col">
                        <span className="amount" onClick={(e, amount) => this.selectAmount(e, i * 25)}>${i * 25}</span>
                    </div>
                );
            }

            let buyNowAmounts = [];

            for(let i = 1; i <= 20; i++) {
                buyNowAmounts.push(
                    <option key={i} value={i * 25}>${i * 25}</option>
                );
            }

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
                                                                Sell: ${item.giftCardValue - (item.giftCardValue * item.giftCardDiscount/100)}
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
                                                {amounts}
                                            </div>
                                            <div className="row gift-card-row">
                                                <div className="col">
                                                    <select value={this.state.amount} className="form-control" onChange={(e, amount) => this.selectAmount(e, null)} style={{width: '200px', margin: '0 auto'}}>
                                                        <option></option>
                                                        {buyNowAmounts}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row gift-card-row center">
                                                <div className="col">
                                                    <button className="btn btn-success" onClick={ (e, amount) => this.buyNowOtherAmount(e, this.state.amount)}>Buy Now</button>
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
                    {/*<div className="modal w-100" id="plugin-how-much">*/}
                        {/*<div className="modal-dialog" role="document">*/}
                            {/*<div className="modal-content">*/}
                                {/*<div className="modal-header">*/}
                                    {/*<h5 className="modal-title">Drizzle: Buy Gift Card with friends and saving!</h5>*/}
                                    {/*<button type="button" className="close" data-dismiss="modal" aria-label="Close">*/}
                                        {/*<span aria-hidden="true">&times;</span>*/}
                                    {/*</button>*/}
                                {/*</div>*/}
                                {/*<div className="modal-body">*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col">*/}
                                            {/*<form action="">*/}
                                                {/*<div className="form-row">*/}

                                                {/*</div>*/}
                                                {/*<div className="form-row">*/}
                                                    {/*<div className="form-group col">*/}
                                                        {/*<label for="amount" className="col-form-label">How much you want to buy: </label>*/}
                                                        {/*<input type="number" className="form-control" id="amount" placeholder="" onChange={ e => this.changeHowMach(e) }/>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</form>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="row justify-content-center">*/}
                                        {/*<div className="col-4">*/}
                                            {/*<button className="btn btn-success gift-card-cart-btn-pay" style={{width: '100%'}} onClick={this.pay.bind(this)}>Pay</button>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}

                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            );
        } else {
            return (
                <div>{this.state.status}</div>
            )
        }
    }
}