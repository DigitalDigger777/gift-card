/**
 * Created by korman on 19.08.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,Route, hashHistory } from 'react-router-dom';
import Statistic from './components/account/Statistic';
import Profile from './components/account/Profile';
import Scan from './components/redeem/Scan';
import Amount from './components/redeem/Amount';
import AmountApprove from './components/redeem/AmountApprove';
import StatementList from './components/statement/StatementList';
import StoreCreditList from './components/member/StoreCreditList';


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
                    <Route exact path="/" component={Statistic}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/redeem/scan" component={Scan}/>
                    <Route exact path="/redeem/amount" component={Amount}/>
                    <Route exact path="/redeem/amount-approve" component={AmountApprove}/>
                    <Route exact path="/statement/list" component={StatementList}/>
                    <Route exact path="/member/store-list" component={StoreCreditList}/>
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

// (function($){
//     $('document').ready(function () {
//         const shopperId = $($('[data-gift-card]')[1]).attr('data-gift-card');
//
//         window.localStorage.setItem('shopperId', shopperId);
//
//         $('[data-gift-card]').click(function (e) {
//             e.preventDefault();
//
//             $('#plugin').modal('show');
//         });
//     });
// })(jQuery);

