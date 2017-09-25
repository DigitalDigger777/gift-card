/**
 * Created by korman on 25.09.17.
 */
import React from 'react';
import ReactDom from 'react-dom';
import {Page, Form, FormCell, CellBody, CellHeader, Label, Input, ButtonArea, Button} from 'react-weui';

export default class ChangeName extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <section>
                <Page className="page">
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>Email</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="Enter email"/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>Password</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="password" placeholder="Enter Password"/>
                            </CellBody>
                        </FormCell>
                    </Form>

                    <ButtonArea>
                        <Button>Login</Button>
                    </ButtonArea>
                </Page>
            </section>
        );
    }
}