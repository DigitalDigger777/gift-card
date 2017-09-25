/**
 * Created by korman on 25.09.17.
 */
import React from 'react';
import ReactDom from 'react-dom';
import Menu from '../core/Menu';
import Header from '../core/Header';
import {Page, Form, FormCell, Cells, Cell, CellBody, CellFooter} from 'react-weui';

export default class MyAccount extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <section>
                <Header/>
                <section>
                    <Page className="page">
                        <h1 style={{textAlign: 'center'}}>Jerry Jiang</h1>
                        <Cells>
                            <Cell access href="/#/change-name">
                                <CellBody>
                                    Name: Jerry Jiang
                                </CellBody>
                                <CellFooter/>
                            </Cell>
                            <Cell access>
                                <CellBody>
                                    Email: eisenbergtech@gmail.com
                                </CellBody>
                            </Cell>
                            <Cell access href="/#/change-password">
                                <CellBody>
                                    Change Password
                                </CellBody>
                                <CellFooter/>
                            </Cell>
                        </Cells>
                        <Menu/>
                    </Page>
                </section>
            </section>
        );
    }
}