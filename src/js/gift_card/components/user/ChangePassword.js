/**
 * Created by korman on 25.09.17.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Menu from '../core/Menu';
import Header from '../core/Header';
import {Page, Form, FormCell, CellBody, CellHeader, Label, Input, ButtonArea, Button} from 'react-weui';

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
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
                                    <Input type="password" placeholder="Enter current password"/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellBody>
                                    <Input type="password" placeholder="Enter new password"/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellBody>
                                    <Input type="password" placeholder="Enter confirm password"/>
                                </CellBody>
                            </FormCell>
                        </Form>

                        <ButtonArea>
                            <Button>Save</Button>
                        </ButtonArea>

                        <Menu/>
                    </Page>
                </section>
            </section>
        );
    }
}