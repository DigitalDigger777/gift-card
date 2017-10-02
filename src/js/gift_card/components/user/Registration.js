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
        FormCell, CellBody, CellHeader,
        Label, Input, ButtonArea, Button, Toast} from 'react-weui';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        const config = new Config();

        this.state = {
            showLoading: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            baseUrl: config.baseUrl
        };
    }

    showLoading() {
        this.setState({showLoading: true});

        this.state.loadingTimer = setTimeout(()=> {
            this.setState({showLoading: false});
        }, 2000);
    }

    save() {
        this.setState({showLoading: true});

        axios.post(this.state.baseUrl + 'store-credit/store-credit-consumer/rest/0', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            this.setState({showLoading: false});
            window.location = '/#/login';
        })
        .catch(function(error){
            console.log(error);
            this.setState({showLoading: false});
        });
    }

    updateFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    updateLastName(e) {
        this.setState({
            lastName: e.target.value
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
                            <FormCell>
                                <CellHeader>
                                    <Label>First Name</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="text" name="firstName" placeholder="Enter First Name" onChange={e => this.updateFirstName(e) }/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label>Last Name</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="text" name="lastName" placeholder="Enter Last Name" onChange={e => this.updateLastName(e) }/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label>Email</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="email" name="email" placeholder="Enter Email" onChange={e => this.updateEmail(e) }/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label>Password</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="password" name="password" placeholder="Enter Password" onChange={e => this.updatePassword(e) }/>
                                </CellBody>
                            </FormCell>
                        </Form>

                        <ButtonArea>
                            <Button onClick={this.save.bind(this)}>Save</Button>
                        </ButtonArea>
                        <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
                        {/*<Menu/>*/}
                    </Page>
                </section>
            </section>
        );
    }
}