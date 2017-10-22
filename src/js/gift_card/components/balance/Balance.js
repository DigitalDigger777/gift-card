/**
 * Created by korman on 22.09.17.
 */

import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import Config from '../Config';
import Menu from '../core/Menu';
import Header from '../core/Header';
import {Page, Grids, Grid, Footer,
    MediaBox, MediaBoxHeader, MediaBoxBody, MediaBoxTitle, MediaBoxDescription,
    Flex, FlexItem,
    Cells, Cell, CellBody, CellFooter, Badge, InfiniteLoader} from 'react-weui';

const appMsgIcon = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==" />;

export default class Balance extends React.Component {

    constructor(props) {
        super(props);
        const config = new Config();
        this.state = {
            items: [],
            baseUrl: config.baseUrl
        };
    }

    componentWillMount(){
        const token = window.localStorage.getItem('token');

        axios.get(this.state.baseUrl + 'gift-card/rest/shopper-balance/0', {
            params: {
                token: window.localStorage.getItem('token'),
                method: 'LIST'
            }
        })
            .then(response => {
                console.log(response);
                this.setState({
                    items: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        if (this.state.items.length > 0) {
            return (
                <section>
                    <Header/>
                    <section>
                        <InfiniteLoader/>
                        <Page className="page gift-card-list" infiniteLoader={true}>
                            {this.state.items.map((item, key) =>
                                <MediaBox className="card" type="appmsg" key={key}>
                                    <MediaBoxHeader>{appMsgIcon}</MediaBoxHeader>
                                    <MediaBoxBody>
                                        <MediaBoxTitle>
                                            <Cell access href={`/#/balance-list/${item.shopper.id}`}>
                                                <CellBody>
                                                    {item.shopper.name}
                                                    <Flex>
                                                        <FlexItem>Balance: ${item.balance/100}</FlexItem>
                                                    </Flex>
                                                </CellBody>
                                                <CellFooter/>
                                            </Cell>
                                        </MediaBoxTitle>
                                    </MediaBoxBody>
                                </MediaBox>
                            )}

                            <Menu/>
                        </Page>
                    </section>
                </section>
            );
        } else {
            return (
                <section>
                    <Header/>
                    <section>
                        <InfiniteLoader/>
                        <Page className="page gift-card-list" infiniteLoader={true}>

                            <Menu/>
                        </Page>
                    </section>
                </section>
            );
        }
    }
}