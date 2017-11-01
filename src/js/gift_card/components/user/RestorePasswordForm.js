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

export default class RestorePasswordForm extends React.Component {
    constructor(props) {
        super(props);
        const config = new Config();

        this.state = {
            showLoading:          false,
            showWarningEmail:     false,
            showWarningFirstName: false,
            showWarningLastName:  false,
            showWarningPassword:  false,
            newPassword:          '',
            confirmPassword:      '',
            baseUrl:              config.baseUrl,
            showWarningToast:     false,
            warningToastMessage:  '',
            restorePasswordToken: props.match.params.token
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


        if (allowSave) {
            this.setState({
                showLoading: true
            });

            axios.post(this.state.baseUrl + 'gift-card/rest/consumer/change-restore-password', {
                token: this.state.restorePasswordToken,
                password: this.state.newPassword,
                confirmPassword: this.state.confirmPassword
            })
                .then(response => {
                    window.location = '/#/restore-password-confirm';
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

    updateNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        });
    }

    updateConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    render(){
        return (
            <section>
                <Header/>
                <section>
                    <Page className="page">
                        <Form>
                            <FormCell warn={this.state.showWarningEmail}>
                                <CellHeader>
                                    <Label>New Password</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="password" name="new_password" placeholder="Enter New Password" onChange={e => this.updateEmail(e) }/>
                                </CellBody>
                                <CellFooter>
                                    <Icon value="warn" />
                                </CellFooter>
                            </FormCell>
                            <FormCell warn={this.state.showWarningEmail}>
                                <CellHeader>
                                    <Label>Confirm Password</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="password" name="confirm_password" placeholder="Enter Confirm Password" onChange={e => this.updateEmail(e) }/>
                                </CellBody>
                                <CellFooter>
                                    <Icon value="warn" />
                                </CellFooter>
                            </FormCell>
                        </Form>

                        <ButtonArea>
                            <Button onClick={this.save.bind(this)}>Restore</Button>
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