/**
 * Created by korman on 25.09.17.
 */
import React from 'react';
import ReactDom from 'react-dom';
import {Page, Form, FormCell, CellBody, CellHeader, Label, Input, ButtonArea, Button, Flex, FlexItem} from 'react-weui';

export default class ChangeName extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <section>
                <Page className="page login">
                    <h4>Drizzle</h4>
                    <p>Buy gift card with friends and saving!</p>
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
                    <Flex className="weui-flex login-footer">
                        <FlexItem>
                            <a href="">Forgot Password?</a>
                        </FlexItem>
                        <FlexItem>
                            <a href="/#/registration">Registration</a>
                        </FlexItem>
                    </Flex>
                    <ButtonArea>
                        <Button>Login</Button>
                    </ButtonArea>
                </Page>
            </section>
        );
    }
}