/**
 * Created by korman on 25.09.17.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Config from '../Config';
import axios from 'axios';
import Menu from '../core/Menu';
import Header from '../core/Header';
import {Page, Form, FormCell, CellBody, CellHeader,
        Label, Input, ButtonArea, Button, Toast} from 'react-weui';

export default class ChangeName extends React.Component {
    constructor(props) {
        super(props);
        const config = new Config();

        this.state = {
            firstName: '',
            lastName: '',
            showLoading: true,
            showSuccess: false,
            baseUrl: config.baseUrl
        }
    }

    updateFirstName(e){
        this.setState({
            firstName: e.target.value
        });
    }

    updateLastName(e){
        this.setState({
            lastName: e.target.value
        });
    }

    save() {
        this.setState({showLoading: true});

        axios.put(this.state.baseUrl + 'gift-card/rest/consumer', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            token: window.localStorage.getItem('token')
        })
        .then(response => {
            this.setState({
                showLoading: false
            });

            this.setState({
                showSuccess: true
            });

            setTimeout(() => {
                this.setState({
                    showSuccess: false
                });
            }, 3000);
        })
        .catch(function(error){
            console.log(error);
            this.setState({showLoading: false});
        });
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

                const nickname = response.data.socialDataProfile.nickname.split(' ');
                this.setState({
                    firstName:      nickname[0],
                    lastName:       typeof nickname[1] != 'undefined' ? nickname[1] : '' ,
                    email:          typeof response.data.socialDataProfile.email == 'undefined' ? response.data.email : response.data.socialDataProfile.email,
                    showLoading:    false
                });
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    render(){

        if (typeof this.state.email != 'undefined') {
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
                                        <Input type="text" placeholder="Enter First Name"
                                               defaultValue={this.state.firstName}
                                               onChange={e => this.updateFirstName(e)}/>
                                    </CellBody>
                                </FormCell>
                                <FormCell>
                                    <CellHeader>
                                        <Label>Last Name</Label>
                                    </CellHeader>
                                    <CellBody>
                                        <Input type="text" placeholder="Enter Last Name"
                                               defaultValue={this.state.lastName}
                                               onChange={e => this.updateLastName(e)}/>
                                    </CellBody>
                                </FormCell>
                            </Form>

                            <ButtonArea>
                                <Button onClick={this.save.bind(this)}>Save</Button>
                            </ButtonArea>
                            <Menu/>
                            <Toast icon="success-no-circle" show={this.state.showSuccess}>Done</Toast>
                            <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
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