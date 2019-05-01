const path = require('path');
const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

const util = require('./server-util');

// enable pug engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src'));
// static resource
app.use(express.static('public'));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(middleware(compiler, {
    publicPath: config.output.publicPath,
    serverSideRender: true
}));

app.get('/', (req, res) => {
    // https://github.com/webpack/memory-fs
    const fs = res.locals.fs;
    // dist path
    const outputPath = res.locals.webpackStats.toJson().outputPath;

    const items = util.dirTree(fs, outputPath, /\.html$/);
    res.render('index', {
        items : items
    });

});

app.all('*', (req, res) => {
    res.status(404).send('<h1>404 - PAGE Not Found</h1>');
});

// Serve the files on port 3000.
app.listen(9000, function () {
    console.log('Example app listening on port 9000!\n');
});
