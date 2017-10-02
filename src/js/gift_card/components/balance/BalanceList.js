/**
 * Created by korman on 22.09.17.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Config from '../Config';
import Menu from '../core/Menu';
import Header from '../core/Header';
import {Page, Grids, Grid, Footer,
    MediaBox, MediaBoxHeader, MediaBoxBody, MediaBoxTitle, MediaBoxDescription,
    Flex, FlexItem,
    Cells, Cell, CellBody, CellFooter, Badge, InfiniteLoader} from 'react-weui';

const appMsgIcon = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==" />;

export default class BalanceList extends React.Component {

    constructor(props) {
        super(props);
        const config = new Config();
        this.state = {
            baseUrl: config.baseUrl
        };
    }

    render(){
        return (
            <section>
                <Header/>
                <section>
                    <InfiniteLoader/>
                    <Page className="page gift-card-list" infiniteLoader={true}>
                        <MediaBox className="card" type="appmsg">
                            <MediaBoxBody>
                                <MediaBoxTitle>
                                    <Cell access>
                                        <CellBody>
                                            Group buy bought $40 Gift Card
                                        </CellBody>
                                    </Cell>
                                </MediaBoxTitle>
                                <MediaBoxDescription>
                                    <div className="cardBody">
                                        <Flex>
                                            <FlexItem>Time: 2017/10/11 17:53</FlexItem>
                                        </Flex>
                                        <Flex>
                                            <FlexItem>Paid: $36.00</FlexItem>
                                        </Flex>
                                        <Flex>
                                            <FlexItem>Type: Group Buy</FlexItem>
                                        </Flex>
                                        <Flex>
                                            <FlexItem>Previous Balance: $2.30</FlexItem>
                                        </Flex>
                                        <Flex>
                                            <FlexItem>New Balance: $42.30</FlexItem>
                                        </Flex>
                                    </div>
                                </MediaBoxDescription>
                            </MediaBoxBody>
                        </MediaBox>

                        <MediaBox className="card" type="appmsg">
                            <MediaBoxBody>
                                <MediaBoxTitle>
                                    <Cell access>
                                        <CellBody>
                                            Spend In Store
                                        </CellBody>
                                    </Cell>
                                </MediaBoxTitle>
                                <MediaBoxDescription>
                                    <div className="cardBody">
                                        <Flex>
                                            <FlexItem>Time: 2017/10/11 17:53</FlexItem>
                                        </Flex>
                                        <Flex>
                                            <FlexItem>Spend: $47.70</FlexItem>
                                        </Flex>
                                        <Flex>
                                            <FlexItem>Type: Spend In Store</FlexItem>
                                        </Flex>
                                        <Flex>
                                            <FlexItem>Previous Balance: $50.00</FlexItem>
                                        </Flex>
                                        <Flex>
                                            <FlexItem>New Balance: $42.30</FlexItem>
                                        </Flex>
                                    </div>
                                </MediaBoxDescription>
                            </MediaBoxBody>
                        </MediaBox>

                        <MediaBox className="card" type="appmsg">
                            <MediaBoxBody>
                                <MediaBoxTitle>
                                    <Cell access>
                                        <CellBody>
                                            Bought $50 Gift Card
                                        </CellBody>
                                    </Cell>
                                </MediaBoxTitle>
                                <MediaBoxDescription>
                                    <div className="cardBody">
                                        <Flex>
                                            <FlexItem>Time: 2017/10/11 17:53</FlexItem>
                                        </Flex>
                                        <Flex>
                                            <FlexItem>Paid: $47.70</FlexItem>
                                        </Flex>
                                        <Flex>
                                            <FlexItem>Type: Direct Buy</FlexItem>
                                        </Flex>
                                        <Flex>
                                            <FlexItem>Previous Balance: $0.00</FlexItem>
                                        </Flex>
                                        <Flex>
                                            <FlexItem>New Balance: $50.00</FlexItem>
                                        </Flex>
                                    </div>
                                </MediaBoxDescription>
                            </MediaBoxBody>
                        </MediaBox>

                        <Menu/>
                    </Page>
                </section>
            </section>
        );
    }
}