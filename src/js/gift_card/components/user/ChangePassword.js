/**
 * Created by korman on 25.09.17.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Config from '../Config';
import axios from 'axios';
import Menu from '../core/Menu';
import Header from '../core/Header';
import {Page, Form, FormCell, CellBody, CellHeader, CellFooter,
        Label, Input, ButtonArea, Button, Toast, Icon} from 'react-weui';

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        const config = new Config();

        this.state = {
            currentPassword: '',
            newPassword:     '',
            confirmPassword: '',
            showLoading:     false,
            showSuccess:     false,
            errorMessage:    '',
            showError:       false,
            baseUrl:         config.baseUrl
        }
    }

    updateCurrentPassword(e){
        this.setState({
            currentPassword: e.target.value
        });
    }

    updateNewPassword(e){
        this.setState({
            newPassword: e.target.value
        });
    }

    updateConfirmPassword(e){
        this.setState({
            confirmPassword: e.target.value
        });
    }

    save(){
        this.setState({
            showLoading: true
        });

        if (this.state.currentPassword != '' && this.state.newPassword != '' && this.state.confirmPassword != '') {
            axios.put(this.state.baseUrl + 'gift-card/rest/consumer/change-password', {
                currentPassword: this.state.currentPassword,
                password: this.state.newPassword,
                confirmPassword: this.state.confirmPassword,
                token: window.localStorage.getItem('token')
            })
                .then(response => {
                    console.log(response);
                    this.setState({
                        showLoading: false,
                        showSuccess: true
                    });

                    setTimeout(() => {
                        this.setState({
                            showSuccess: false
                        });
                    }, 3000)
                })
                .catch(error => {
                    console.log(error.response.data);
                    this.setState({
                        showLoading: false,
                        showError: true,
                        errorMessage: error.response.data.message
                    });

                    setTimeout(() => {
                        this.setState({
                            showError: false
                        });
                    }, 3000);
                });
        } else {
            this.setState({
                showLoading: false,
                showError: true,
                errorMessage: 'fields is empty'
            });

            setTimeout(() => {
                this.setState({
                    showError: false
                });
            }, 3000);
        }
    }

    render(){
        return (
            <section>
                <Header/>
                <section>
                    <Page className="page">
                        <h5 style={{textAlign: 'center'}}>password must be 6-12 characters</h5>
                        <Form>
                            <FormCell>
                                <CellBody>
                                    <Input type="password" placeholder="Enter current password" onChange={e => this.updateCurrentPassword(e) }/>
                                </CellBody>
                                {/*<CellFooter>*/}
                                    {/*<Icon value="warn" />*/}
                                {/*</CellFooter>*/}
                            </FormCell>
                            <FormCell>
                                <CellBody>
                                    <Input type="password" placeholder="Enter new password" onChange={e => this.updateNewPassword(e) }/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellBody>
                                    <Input type="password" placeholder="Enter confirm password" onChange={e => this.updateConfirmPassword(e) }/>
                                </CellBody>
                            </FormCell>
                        </Form>

                        <ButtonArea>
                            <Button onClick={ this.save.bind(this) }>Save</Button>
                        </ButtonArea>

                        <Menu/>
                        <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
                        <Toast icon="success-no-circle" show={this.state.showSuccess}>Done</Toast>
                        <Toast icon="warn" show={this.state.showError}>{this.state.errorMessage}</Toast>
                    </Page>
                </section>
            </section>
        );
    }
}