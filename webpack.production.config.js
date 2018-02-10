var pkg = require('./package.json');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	//入口文件
	entry :{
		//polyfill指的是“用于实现浏览器不支持原生功能的代码”
		"babel-polyfill": "babel-polyfill", //用来解决IE9的兼容性
		app:path.resolve(__dirname,'src/index.js'),
		//将第三方依赖（node_modules）单独打包
		vendor:Object.keys(pkg.dependencies)
	},
	output :{
		path:__dirname + '/build',
		filename:"./[name].[chunkhash:8].js"
	},
	resolve:{
		extensions:['.json','.js','.jsx']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
            	exclude: /node_modules/, 
            	use: [
            		{loader: 'babel-loader'} 
            	]
			},
			{
                test: /\.css$/,
//              exclude: /node_modules/,
                use:[
            		{
            			loader: 'style-loader'
            		},
            		{
            			loader: 'css-loader?importLoaders=1'
            		},
            		{ 
						loader: 'postcss-loader', 
						options: { 
							sourceMap: true, 
							config: { 
								path: './postcss.config.js '// 这个得在项目根目录创建此文件 
							} 
						} 
					} 
            	]
            },
            { 
            	test: /\.less$/,
            	exclude: /node_modules/, 
            	use:[
            		{
            			loader: 'style-loader'
            		},
            		{
            			loader: 'css-loader'
            		},
            		{ 
						loader: 'postcss-loader', 
						options: { 
							sourceMap: true, 
							config: { 
								path: './postcss.config.js '// 这个得在项目根目录创建此文件 
							} 
						} 
					} 
            	]
            },
            // 图片处理
            {
                test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        'limit': 5000,
                    }
                }]
            },
             // scss 编译
            {
                test:/\.scss$/,
                exclude: /node_modules/,
                // 编译scss 不分离文件
                // use:['style-loader',"postcss-loader",'css-loader','sass-loader']
                // 分离css文件
                use:[
            		{
            			loader: 'style-loader'
            		},
            		{
            			loader: 'css-loader'
            		},
            		{ 
						loader: 'postcss-loader', 
						options: { 
							sourceMap: true, 
							config: { 
								path: './postcss.config.js '// 这个得在项目根目录创建此文件 
							} 
						} 
					} 
            	]
            },
            { 
            	test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, 
            	use:[
            		{
            			loader: 'url-loader',
            			options:{
            				'limit': 5000,
            			}
            		}
            	]
            } // 限制大小小于5k
		]
	},
	plugins: [
		//webpack内置的banner-plugin，用于在打包的文件中添加信息
		new webpack.BannerPlugin("Copyright by ********"),
		
		// html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html'
        }),
        //定义为生产环境，编译React事压缩代码到最小
        new webpack.DefinePlugin({
        	'process.env':{
        		'NODE_ENV':JSON.stringify(process.env.NODE_ENV)
        	}
        }),
        
        //为组件分配id通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin(),
        //压缩代码
        new webpack.optimize.UglifyJsPlugin({
        	cpmpress: {
        		warnings: false
        	}
        }),
        
        //分离css和js文件
        new ExtractTextPlugin('/[name].[chunkhash:8].css'),
        //提取公共代码
        new webpack.optimize.CommonsChunkPlugin({
	      name: 'vendor',
	      filename: '/[name].[chunkhash:8].js'
	    }),
	    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
	    new webpack.DefinePlugin({
	      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
	    })
	]
}
