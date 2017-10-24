/**
 * Created by korman on 25.09.17.
 */
import React from 'react';
import ReactDom from 'react-dom';
import Config from '../Config';
import axios from 'axios';
import {Page, Form, FormCell, CellBody, CellHeader, CellFooter, Icon,
        Label, Input, ButtonArea, Button, Flex, FlexItem, Toast} from 'react-weui';

export default class ChangeName extends React.Component {
    constructor(props) {
        super(props);
        const config = new Config();

        this.state = {
            email: '',
            password: '',
            showLoading: false,
            showWarningEmail: false,
            showWarningPassword: false,
            baseUrl: config.baseUrl
        }
    }

    updateEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    updatePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    login() {

        this.setState({
            showLoading: true
        });


        axios.post(this.state.baseUrl + 'gift-card/rest/consumer/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            console.log(response);
            window.localStorage.setItem('token', response.data.token);
            this.setState({
                showLoading: false,
                showWarningEmail: false,
                showWarningPassword: false
            });

            // const orderShopperId = window.localStorage.getItem('order_shopper_id');
            const orderProcess   = window.localStorage.getItem('order_process');

            if (!orderProcess) {
                window.location = '/#/';
            } else {
                window.location = '/payment.php';
            }

        })
        .catch(error => {
            console.log(error);
            this.setState({
                showLoading: false,
                showWarningEmail: true,
                showWarningPassword: true
            });
        });
    }

    render(){
        return (
            <section>
                <Page className="page login">
                    <h4>Drizzle</h4>
                    <p>Buy gift card with friends and saving!</p>
                    <Form>
                        <FormCell warn={this.state.showWarningEmail}>
                            <CellHeader>
                                <Label>Email</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="Enter email" onChange={ e => this.updateEmail(e)}/>
                            </CellBody>
                            <CellFooter>
                                <Icon value="warn" />
                            </CellFooter>
                        </FormCell>
                        <FormCell warn={this.state.showWarningPassword}>
                            <CellHeader>
                                <Label>Password</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="password" placeholder="Enter Password"  onChange={ e => this.updatePassword(e)}/>
                            </CellBody>
                            <CellFooter>
                                <Icon value="warn" />
                            </CellFooter>
                        </FormCell>
                    </Form>
                    <Flex className="weui-flex login-footer">
                        <FlexItem>
                            <a href="">Forgot Password?</a>
                        </FlexItem>
                        <FlexItem>
                            <a href="/#/registration">Registration</a>
                        </FlexItem>
                    </Flex>
                    <ButtonArea>
                        <Button onClick={this.login.bind(this)}>Login</Button>
                    </ButtonArea>
                    <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
                    <Toast icon="warn" show={this.state.showWarning}>Loading...</Toast>
                </Page>
            </section>
        );
    }
}