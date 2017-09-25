/**
 * Created by zhangbin on 2017/4/1.
 */
var webpack = require('webpack');

module.exports = {
    context: __dirname + "/src/js/gift_card",
    entry: "./index.js",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs']

                }
            },
            //下面是使用 ant-design 的配置文件
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 25000,
                },
            },
        ]
    },
    output: {
        path: __dirname,
        filename: "./public/gift_card.js"
    }
}