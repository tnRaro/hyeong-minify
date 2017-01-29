const path = require("path");

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: "./minify",
	output: {
		path: path.resolve(__dirname, "lib"),
		filename: "bundle.js",
		library: "hyeong",
		libraryTarget: "umd"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader"
			}
		]
	}
};
