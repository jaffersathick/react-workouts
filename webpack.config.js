var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './recipes/dnd/DragAndDropFlowchart',
    output: {
    	path:path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:['babel-loader']
			},
			{
				test:/\.css$/,
				exclude:/node_modules/,
				use:['style-loader','css-loader']
			},
			{
				test:/\.(jpe?g|png|svg)$/,
				use:'file-loader?name=[path][name].[ext]&outputPath=images/'
			}
		]
	},
	devServer:{
		contentBase:path.join(__dirname, "build"),
		historyApiFallback: true,
		//compress:true, //gzip
		port:9000,
		hot:true,
		disableHostCheck: true, 
		host:'0.0.0.0'
	},
	plugins:[new HtmlWebpackPlugin({
		title:'Path Draw',
		/*minify:{
			collapseWhitespace:true
		},
		hash:true,*/
		template:'index.html'
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin()
	]
};