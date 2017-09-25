/**
 * Created by korman on 25.09.17.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Menu from '../core/Menu';
import Header from '../core/Header';
import {Page, Form, FormCell, CellBody, CellHeader, Label, Input, ButtonArea, Button} from 'react-weui';

export default class ChangeName extends React.Component {
    constructor(props) {
        super(props);
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
                                    <Input type="text" placeholder="Enter First Name"/>
                                </CellBody>
                            </FormCell>
                            <FormCell>
                                <CellHeader>
                                    <Label>Last Name</Label>
                                </CellHeader>
                                <CellBody>
                                    <Input type="text" placeholder="Enter Last Name"/>
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