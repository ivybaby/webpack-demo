const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//创建一个全新的html,所有bundle会直接被加载里面，不会包含原来html默认的内容
const CleanWebpackPlugin = require('clean-webpack-plugin');//清理之前的在文件中不需要的文件
const webpack = require('webpack');//模块热替换(Hot Module Replacement 或 HMR),只在开发环境使用

module.exports = {
    entry: {
        // './src/index.js'
        // app: './src/index.js',
        // print: './src/print.js'
        index: './src/index.js'
       // another: './src/another-module.js'
    },
    // devtool: 'inline-source-map',//仅解释说明，不要用于生产环境
    devServer: {
        contentBase: './dist',//可以实时刷新加载,localhost:8080 下建立服务
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
       new webpack.HotModuleReplacementPlugin(),
       //  new webpack.optimize.UglifyJsPlugin({
       //      sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
       //  })
        new webpack.DefinePlugin({//在原始的源码中执行查找和替换操作
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    output: {
        // filename: 'bundle.js',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
};