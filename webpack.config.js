const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const uglifyjs = require('uglifyjs-webpack-plugin');

//公共目录
const website = {
	publicPath:'/'
}
module.exports = {
	entry: {
		//polyfill指的是“用于实现浏览器不支持原生功能的代码”
		"babel-polyfill": "babel-polyfill", //用来解决IE9的兼容性
		app:path.resolve(__dirname, 'src/index.js'),//项目的入口文件
	},
	output: {
		filename: '[name].js',
	},
	resolve: {
		//resolve配置用来影响webpack模块解析规则。解析规则也可以称之为检索，
		//索引规则。配置索引规则能够缩短webpack的解析时间，提升打包速度
		extensions: ['.js','.jsx','.json','.coffee','.less','.css']
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
                exclude: /node_modules/,
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
	// html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html'
        }),
		//热加载插件，实时更新
		new webpack.HotModuleReplacementPlugin(),
		// 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),//设置基本的目录
		inline: true,//true代码有变化，浏览器端进行刷新
		open:true,//在默认浏览器中打开窗口
		port:8899,//启动服务的端口
		host:'localhost',//使用ip.address插件，也可以设置为localhost的地址
		progress:true,//编译时的进度
        historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        hot: true  // 使用热加载插件 HotModuleReplacementPlugin
	}
}

