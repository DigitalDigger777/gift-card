/**
 * Created by korman on 11.10.17.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Config from '../Config';
import axios from 'axios';


export default class GiftCardFriendBuy extends React.Component {

    constructor(props){
        super(props);
        const config = new Config();
        const token = window.localStorage.getItem('token');

        if (!token) {
            window.location = '/#/login';
        }

        this.state = {
            token:              token,
            giftCardGroupBuyId: props.match.params.giftCardGroupBuyId,
            item:               null,
            baseUrl:            config.baseUrl,
            amount:             25,
            timeLeft:           '',
            iterator:           0,
            countDownDate:      null
        };
    }

    componentWillMount(){

        axios.get(this.state.baseUrl + 'gift-card/rest/group-buy/' + this.state.giftCardGroupBuyId)
            .then(response => {
                console.log(response);
                console.log(response.data.dateExpired.date);

                this.setState({
                    item: response.data,
                    iterator: result.data.giftCard.giftCardValue/25,
                    countDownDate: new Date(response.data.dateExpired.date).getTime(),
                });

            }).catch(error => {
                console.log(error);
            });

    }

    componentDidMount(){
        $('#plugin-friend-buy').modal('show');
        this.interval = setInterval(this.timer, 1000);
    }

    componentWillUnmount() {
        //console.log('unmount')
        clearInterval(this.interval);
    }

    changeAmount(e){
        this.setState({
            amount: e.target.value
        });
    }

    pay(){

        window.localStorage.setItem('order_group_buy_id', this.state.giftCardGroupBuyId);
        window.localStorage.setItem('order_amount', this.state.amount);
        window.localStorage.setItem('isFriendBuy', true);

        window.location = '/payment.php';
    }

    timer(){

        // Get todays date and time
        let now = new Date().getTime();

        // Find the distance between now an the count down date
        let distance = this.state.countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days    = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        if (!isNaN(days)) {
            this.setState({
                timeLeft: days + " days " + hours + ":" + minutes + ":" + seconds
            });
        }
        // console.log(this.state.timeLeft);
        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(this.interval);
            this.setState({
                timeLeft: "EXPIRED"
            });
        }
    }

    changeHowMach(e) {
        console.log(e.target.value);
        this.setState({
            amount: e.target.value
        });
    }

    render() {
        if (this.state.item) {
            console.log(this.state.item.ownerConsumer.socialDataProfile.nickname);
            const nickname = this.state.item.ownerConsumer.socialDataProfile.nickname;

            let options = [];

            for (let i = 1; i <= this.state.iterator; i++) {
                options.push(<option key={i} value={i * 25}>${i * 25}</option>);
            }

            return (
                <div className="modal w-100" id="plugin-friend-buy">
                    <div className="modal-dialog" role="document" style={{maxWidth: '90%'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Drizzle: Buy Gift Card with friends and saving!
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="text-center">Left: {this.state.timeLeft}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h5 className="text-center">
                                            {nickname} Invite you buy {this.state.item.giftCard.shopper.name} Gift Card together
                                        </h5>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        <div className="card gift-card">
                                            <div className="card-body text-center">
                                                <h6>{this.state.item.giftCard.shopper.name}<br/>Gift Card</h6>
                                                <p>${this.state.item.giftCard.giftCardValue}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{marginTop: '40px'}}>
                                    <div className="col">
                                        <h5 className="text-center">
                                            {nickname} Paid $50
                                        </h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h5 className="text-center">
                                            To buy this gift card successfully, {nickname} need find someone to buy another $50
                                        </h5>
                                    </div>
                                </div>
                                <div className="row" style={{marginTop: '40px'}}>
                                    <div className="col">
                                        <p className="text-center">How much you want to buy:</p>
                                    </div>
                                    <div className="col">
                                        <input type="text" className="form-control" onChange={e => this.changeAmount(e)}/>
                                        <select className="form-control" id="how-mach" name="how-mach" onChange={ e => this.changeHowMach(e) }>
                                            {options}
                                        </select>
                                    </div>
                                    <div className="col justify-content-left">
                                        <button className="btn btn-success btn-block" style={{width: '50%'}} onClick={this.pay.bind(this)}>Buy</button>
                                    </div>
                                </div>


                                <div className="row" style={{marginTop: '40px'}}>
                                    <div className="col">
                                        <p className="text-center">
                                            Your credit card will be charged until this group buy successfully
                                            <br/>
                                            You need find another one to buy make it successfully
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="modal w-100" id="plugin-friend-buy">
                    <div className="modal-dialog" role="document" style={{maxWidth: '90%'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Drizzle: Buy Gift Card with friends and saving!</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Load...
                            </div>

                        </div>
                    </div>
                </div>
            );
        }
    };
}