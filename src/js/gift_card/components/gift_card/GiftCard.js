/**
 * Created by korman on 22.09.17.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Config from '../Config';
import axios from 'axios';
import Menu from '../core/Menu';
import Header from '../core/Header';

import {Page, Flex, FlexItem,
        Cells, Cell, CellBody, CellFooter,
        Badge, InfiniteLoader,
        Grids, Grid, Progress, NavBarItem, Toast} from 'react-weui';

const appImage = <img style={{width:'100%'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAAGFBAMAAADzwA07AAAAIVBMVEXr6+vPz8/X19fp6ene3t7k5OTm5ubh4eHT09Pb29vR0dHqLrSfAAACyklEQVR42uzBgQAAAACAoP2pF6kCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGB27GdHaSiO4vgJ5e+s5lzAFlZ2Y1yWoIm6AjPJbItG3VJdmLiiOg9Aow8AybinK1/Tey9ldDttl+eTFC6w+4b+2luRNi2XcIJl8v/H6quHhf9BHiXnFlbGE6wep/D8+gm8Dp8CnEAeJePOBz4n7XKssi254gFWzEkVUWVb0uEeVklz7rxS2ZYM/PnfZ8zEz4atyrYkYOjn63emAPI5VLYtxczHe+HnbWxc7K9fVLYFxwjAIur5eVuGQLcgn6lsczkTYDNDOQb6Nma/oJWqbGMLV/EYIg6BAffIaG5iTlW2sSFXQDFGblzDAwqTIIi5VdmmRrZbYI/F3FXeDbj3uQ8q29SA1/ZYYcgtFkzeMAXQ50llmwo4RYcpRlwhj5DN4RShyjZWTHA1Bwa233Fm435w4onKNnY0yAwQ8BrFFGuezVS2sc0c6xBAPA04Rswz8+9Z7VBl61lwG48BrCd+IEQ33i36DB8eNKpsHUP+KPcAMuMvYgYXnFzS71S2jhF/8+D/mq+YIotwURh4GVOVraPHXy4dOsznfrNb3XUh9kv3nqhsHQEjlw5dFsa97qudAnK/RI8GKltLTANfkyEQlFECfOMBGDFKAaw5Vtl61lW1wifMaW7fMkpcZJr7u+fkTmXr2VRbgqM/+3slrZ+wPtP7A5WtZ8FTVfgA63VhYyZw3tGaJSrbkuDTe1Re3t1/hIiIiIiIiIiIiIj8ZQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVhT04EAAAAAAA8n9tBFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVpT04JAAAAAAQ9P+10RMAAAAAAAAAAAAAAADAArTtXKLPR7LcAAAAAElFTkSuQmCC" />;

export default class GiftCard extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        const config = new Config();
        this.state = {
            id: props.match.params.id,
            shopper: '',
            showLoading: false,
            baseUrl: config.baseUrl
        }
    }

    componentWillMount(){
        this.setState({
            showLoading: true
        });

        axios.get(this.state.baseUrl + 'gift-card/rest/partner/' + this.state.id)
            .then(response => {
                console.log(response);
                let sell = 0;
                // response.data.partners.map(item => {
                //     sell += item.amount;
                // });

                this.setState({
                    shopper: response.data.giftCardGroupBuy.giftCard.shopper.name,
                    giftCardValue: response.data.giftCardGroupBuy.giftCard.giftCardValue,
                    owner: response.data.giftCardGroupBuy.ownerConsumer.socialDataProfile.nickname,
                    totalUsers: 0,
                    sell: sell,
                    percentOfGoal: function(){
                        return Math.round(sell/(response.data.giftCardGroupBuy.giftCard.giftCardValue/100), 2);
                    }(),
                    showLoading: false
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        console.log(this.state);

        if (this.state.shopper != '') {
            return (
                <section>
                    <Header/>
                    <section>
                        {/*<InfiniteLoader/>*/}
                        <Page className="page gift-card" infiniteLoader={true}>

                            <Flex>
                                <FlexItem>{appImage}</FlexItem>
                            </Flex>
                            <Flex className="weui-flex gift-card-item">
                                <FlexItem>{this.state.shopper} ${this.state.giftCardValue} Gift Card</FlexItem>
                            </Flex>
                            <Flex className="weui-flex gift-card-item gift-card-info">
                                <FlexItem>
                                    <Grids>
                                        <Grid>${this.state.sell} <p>Sell</p></Grid>
                                        <Grid>{this.state.owner} <p>Group Buy Owner</p></Grid>
                                        <Grid>{this.state.totalUsers} <p>Total Users</p></Grid>
                                    </Grids>
                                </FlexItem>
                            </Flex>
                            <Flex className="weui-flex gift-card-item">
                                <FlexItem>Time Left: 14:27:50</FlexItem>
                            </Flex>
                            <Flex className="weui-flex gift-card-item">
                                <FlexItem>
                                    <Progress defaultValue="100" showCancel={false}
                                              style={{paddingLeft: '10px', paddingRight: '10px'}}/>
                                </FlexItem>
                            </Flex>
                            <Flex className="weui-flex gift-card-item">
                                <FlexItem>{this.state.percentOfGoal}% of ${this.state.giftCardValue} goal</FlexItem>
                                <FlexItem>${this.state.sell} Bought by {this.state.totalUsers} Users</FlexItem>
                            </Flex>
                            <Flex className="weui-flex gift-card-invite">
                                <FlexItem>Invite your friend to buy together:</FlexItem>
                            </Flex>
                            <Flex className="weui-flex gift-card-invite-social">
                                <FlexItem>Facebook</FlexItem>
                            </Flex>
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
                        {/*<InfiniteLoader/>*/}
                        <Page className="page gift-card" infiniteLoader={true}>
                            <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
                            <Menu/>
                        </Page>
                    </section>
                </section>
            );
        }
    }
}