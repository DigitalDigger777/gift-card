/**
 * Created by korman on 22.09.17.
 */

import React from 'react';
import {Flex, FlexItem} from 'react-weui';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    back() {
        history.back();
    }

    render() {
        return (
            <div className="gift-card-header">
                <Flex>
                    {/*weui-icon-back*/}
                    <FlexItem className="weui-flex__item back" onClick={this.back}>Back</FlexItem>
                    <FlexItem className="weui-flex__item title">My Group Buy</FlexItem>
                    <FlexItem className="weui-flex__item more">...</FlexItem>
                </Flex>
            </div>
        )
    }
}