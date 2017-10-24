/**
 * Created by korman on 25.09.17.
 */
import React from 'react';
import ReactDom from 'react-dom';
import Config from '../Config';
import axios from 'axios';
import Menu from '../core/Menu';
import Header from '../core/Header';
import {Page, Form, FormCell, Cells, Cell, CellBody, CellFooter, Toast} from 'react-weui';

export default class MyRedeemCode extends React.Component {
    constructor(props) {
        super(props);
        const config = new Config();

        this.state = {
            userId:         '',
            firstName:      '',
            lastName:       '',
            email:          '',
            token:          window.localStorage.getItem('token'),
            showLoading:    true,
            baseUrl:        config.baseUrl
        }
    }

    componentWillMount(){
        const token = window.localStorage.getItem('token');

        if (token) {
            axios.get(this.state.baseUrl + 'gift-card/rest/consumer', {
                params: {
                    token: token
                }
            })
                .then(response => {
                    console.log(response);

                    this.setState({
                        userId: response.data.id,
                        nickname:  response.data.socialDataProfile.nickname,
                        email:     response.data.email,
                        showLoading: false
                    });
                })
                .catch(error => {
                    console.log(error);
                });

        }
    }

    render(){

        if (this.state.email != '' && typeof this.state.email != 'undefined') {


            return (
                <section>
                    <Header/>
                    <section>
                        <Page className="page">
                            <h1 style={{textAlign: 'center'}}>{this.state.nickname}</h1>
                            <img src={this.state.baseUrl + `gift-card/consumer-qr-generate?token=${this.state.token}`} style={{margin: '0 auto', display: 'block'}}/>
                            <Menu/>
                        </Page>
                    </section>
                </section>
            );
        } else {

            return (
                <section>
                    <Header/>
                    <section>
                        <Page className="page">
                            <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
                        </Page>
                    </section>
                </section>
            );
        }
    }
}