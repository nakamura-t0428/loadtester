var path = require('path');
module.exports = {
    output: {
        filename: 'app.dist.js'
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}
