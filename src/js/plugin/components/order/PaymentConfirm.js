/**
 * Created by korman on 08.10.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Config from '../Config';

export default class PaymentConfirm extends React.Component {
    constructor(props) {
        super(props);
        const config = new Config();
        this.state = {
            giftCardId: props.match.params.giftCardId,
            baseUrl: config.baseUrl
        }
    }

    componentDidMount(){

        $('#order-is-accepted-payment-confirm').modal('show');
    }

    render(){
        return (
                <div id="order-is-accepted-payment-confirm" className="modal w-100">
                    <div className="modal-dialog" role="document" style={{maxWidth: '70%'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Drizzle: Buy Gift Card with friends and saving!</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col icon">
                                        <i className="fa fa-check-circle" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col message">
                                        Congratulations! Your order is accepted.
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col" style={{textAlign: 'center'}}>
                                        Now you can
                                    </div>
                                </div>
                                <div className="row actions">
                                    <div className="col">
                                        Ask your friend to buy it together
                                    </div>
                                    <div className="col">
                                        Check Group buy status
                                    </div>
                                </div>
                                <div className="row social">
                                    <div className="col">
                                        <a href="">
                                            <i className="fa fa-facebook" aria-hidden="true"></i>
                                        </a>
                                        <a href="">
                                            <i className="fa fa-google-plus" aria-hidden="true"></i>
                                        </a>
                                        <a href="">
                                            <i className="fa fa-twitter" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        );
    }
}
