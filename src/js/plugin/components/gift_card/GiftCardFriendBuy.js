/**
 * Created by korman on 11.10.17.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Config from '../Config';
import axios from 'axios';


export default class GiftCardModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token: window.localStorage.getItem('token')
        };
    }

    componentDidMount(){
        $('#plugin-friend-buy').modal('show');
    }

    render() {
        return(
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
                            <div className="row">
                                <div className="col">
                                    <h5 className="text-center">Left: 22:17:03</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h5 className="text-center">Jack Invite you buy Starbucks Gift Card together</h5>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-4">
                                    <div className="card gift-card">
                                        <div className="card-body text-center">
                                            <h6>Starbucks<br/>Gift Card</h6>
                                            <p>$100</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{marginTop: '40px'}}>
                                <div className="col">
                                    <h5 className="text-center">Jack Paid $50</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h5 className="text-center">To buy this gift card successfully, Jack need find someone to buy another $50</h5>
                                </div>
                            </div>
                            <div className="row" style={{marginTop: '40px'}}>
                                <div className="col">
                                    <p className="text-center">How much you want to buy:</p>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="col justify-content-left">
                                    <button className="btn btn-success btn-block" style={{width: '50%'}}>Buy</button>
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
    };
}