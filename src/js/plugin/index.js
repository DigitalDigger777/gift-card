/**
 * Created by korman on 19.08.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,Route, hashHistory } from 'react-router-dom';
import GiftCardModal from './components/gift_card/GiftCardModal';
import GroupBuyAmount from './components/order/GroupBuyAmount';

// import Auth from './components/user/Auth';

import 'weui';
import 'react-weui/build/packages/react-weui.css';
import './../../../public/css/app.css';


export default class Index extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
            <HashRouter history={hashHistory}>
                <div>
                    <Route exact path="/" component={GiftCardModal}/>
                </div>
            </HashRouter>
        );
    }
}

// const auth = new Auth();
// console.log(window.location.hash);
// console.log(auth.checkAuth());
// if (!auth.checkAuth() && window.location.hash != '#/login') {
//     window.location = '/#/login';
// }

ReactDOM.render(<Index/>, document.getElementById('root'));

(function($){
    $('document').ready(function () {
        const shopperId = $($('[data-gift-card]')[1]).attr('data-gift-card');

        window.localStorage.setItem('shopperId', shopperId);

        $('[data-gift-card]').click(function (e) {
            e.preventDefault();

            $('#plugin').modal('show');
        });
    });
})(jQuery);

