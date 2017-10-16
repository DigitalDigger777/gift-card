/**
 * Created by korman on 25.09.17.
 */

import React from 'react';
import ReactDom from 'react-dom';

import {Grids, Grid, Footer} from 'react-weui';

export default class Menu extends React.Component
{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Footer className="weui-footer_fixed-bottom" style={{bottom: '0px'}}>
                <Grids className="menu">
                    <Grid label="My Group Buy" href="/#/"/>
                    <Grid label="Balance" href="/#/balance"/>
                    <Grid label="My Account" href="/#/my-account"/>
                </Grids>
            </Footer>
        );
    }
}