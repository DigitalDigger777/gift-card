/**
 * Created by korman on 25.09.17.
 */

import React from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';
import Config from '../Config';
import Menu from '../core/Menu';
import Header from '../core/Header';
import {Page, Form,
    FormCell, CellBody, CellHeader, CellFooter, Icon,
    Label, Input, ButtonArea, Button, Toast} from 'react-weui';

export default class ShopperRegistration extends React.Component {

    constructor(props) {
        super(props);
        const config = new Config();

        this.state = {
            showLoading:            false,
            showWarningEmail:       false,
            showWarningShopperName: false,
            showWarningPassword:    false,
            shopperName:              '',
            email:                  '',
            password:               '',
            baseUrl:                config.baseUrl,
            showWarningToast:       false,
            warningToastMessage:    ''
        };
    }

    showLoading() {
        this.setState({showLoading: true});

        this.state.loadingTimer = setTimeout(()=> {
            this.setState({
                showLoading: false
            });
        }, 2000);
    }

    save() {

        let allowSave = true;

        if (this.state.firstName == '') {
            this.setState({
                showWarningShopperName: true
            });
            allowSave = false;
        } else {
            this.setState({
                showWarningShopperName: false
            });
        }

        if (this.state.email == '') {
            this.setState({
                showWarningEmail: true
            });
            allowSave = false;
        } else {
            this.setState({
                showWarningEmail: false
            });
        }

        if (this.state.password == '') {
            this.setState({
                showWarningPassword: true
            });
            allowSave = false;
        } else {
            this.setState({
                showWarningPassword: false
            });
        }

        if (allowSave) {
            this.setState({
                showLoading: true
            });

            axios.post(this.state.baseUrl + 'gift-card/rest/shopper/0', {
                name: this.state.shopperName,
                email:       this.state.email,
                password:    this.state.password
            })
                .then(response => {
                    this.setState({
                        showLoading: false,
                        showWarningEmail: false
                    });
                    window.location = '/#/login';
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    this.setState({
                        showLoading: false,
                        showWarningEmail: true,
                        showWarningToast: true,
                        warningToastMessage: error.response.data.message
                    });

                    setTimeout(() => {
                        this.setState({
                            showWarningToast: false
                        });
                    }, 3000);
                });
        }
    }

    updateShopperName(e) {
        this.setState({
            shopperName: e.target.value
        });
    }

    updateEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    updatePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    render(){
        return (
            <section>
                <Header/>
                <section>
                    <Page className="page">
                        <Form>
                            <FormCell warn={this.state.showWarningShopperName}>
                                <CellHeader>
                                    <Label style={{fontSize: '14px'}}>Shopper Name</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="text" name="shopperName" placeholder="Enter Shopper Name" onChange={e => this.updateShopperName(e) }/>
                                </CellBody>
                                <CellFooter>
                                    <Icon value="warn" />
                                </CellFooter>
                            </FormCell>
                            <FormCell warn={this.state.showWarningEmail}>
                                <CellHeader>
                                    <Label style={{fontSize: '14px'}}>Email</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="email" name="email" placeholder="Enter Email" onChange={e => this.updateEmail(e) }/>
                                </CellBody>
                                <CellFooter>
                                    <Icon value="warn" />
                                </CellFooter>
                            </FormCell>
                            <FormCell warn={this.state.showWarningPassword}>
                                <CellHeader>
                                    <Label style={{fontSize: '14px'}}>Password</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="password" name="password" placeholder="Enter Password" onChange={e => this.updatePassword(e) }/>
                                </CellBody>
                                <CellFooter>
                                    <Icon value="warn" />
                                </CellFooter>
                            </FormCell>
                        </Form>

                        <ButtonArea>
                            <Button onClick={this.save.bind(this)}>Save</Button>
                        </ButtonArea>
                        <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
                        <Toast icon="warn" show={this.state.showWarningToast}>{this.state.warningToastMessage}</Toast>
                        {/*<Menu/>*/}
                    </Page>
                </section>
            </section>
        );
    }
}