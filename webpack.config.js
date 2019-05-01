const path = require('path');
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// https://github.com/webpack-contrib/copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');

const src = path.join(__dirname, 'src');

const entries = glob.sync(path.join(src, '**/*.js')).filter(file => {
    let relative = path.relative(src, file);
    if (relative.startsWith('lib')) {
        return false;
    }
    return true;
}).map(file => {
    // src 와 확장자가 제거된 js 파일의 경로
    let relative = path.relative(src, file).replace('\\', '\/');
    // 확장자 제거
    let ext = path.extname(file);
    if (ext !== '') {
        let idx = relative.lastIndexOf(ext);
        relative = relative.substring(0, idx);
    }

    return {
        name: relative,
        path: file
    };
}).reduce((memo, file) => {
    memo[file.name] = file.path;
    return memo;
}, {});

// console.log('entries:');
// console.log(entries);

module.exports = {
    mode: 'development',
    entry: entries,
    output: {
        filename: '[name].es5.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    // https://webpack.js.org/configuration/devtool/
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        comments: true
                    }
                }
            }
        ]
    },
    optimization: {
        runtimeChunk: true,
    },
    plugins: [].concat(
        Object.keys(entries).map(key => {
            let basename = path.basename(entries[key], '.js');

            return new HtmlWebpackPlugin({
                hash: true,
                title: basename,
                filename: `${key}.html`,
                template: 'src/_template.html',
                inject: 'body',
                chunks: [key]
            });
        }),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{
            context: 'src/',
            from: '**/*.js'
        }, {
            context: 'src/',
            from: '**/*.md'
        }], {
            ignore: ['lib/*.js']
        })
    )
};
