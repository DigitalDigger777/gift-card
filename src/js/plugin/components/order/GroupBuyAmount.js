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
            baseUrl: config.baseUrl
        }
    }

    componentWillMount(){

    }

    pay(){
        window.location = 'https://drizzle.jjpanda.com/payment.html';
    }

    render(){
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
                                                <label for="how-mach" className="col-form-label">How much you want to buy: </label>
                                                <input type="text" className="form-control" id="how-mach" placeholder=""/>
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
        );
    }
}
