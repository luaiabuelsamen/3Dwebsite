const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const ip = require('internal-ip')
const portFinderSync = require('portfinder-sync')
const path = require('path');

const infoColor = (_message) =>
{
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            host: '0.0.0.0',
            port: portFinderSync.getPort(8000),
            static: {
                directory: path.resolve(__dirname, "static"),
                staticOptions: {},
                // Don't be confused with `devMiddleware.publicPath`, it is `publicPath` for static directory
                // Can be:
                // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
                publicPath: "/static-public-path/",
                // Can be:
                // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
                serveIndex: true,
                // Can be:
                // watch: {} (options for the `watch` option you can find https://github.com/paulmillr/chokidar)
                watch: true,
              },
            open: true,
            https: false,
            host: "local-ip",
            allowedHosts: "all",
            onAfterSetupMiddleware: function(devServer)
            {
                const port = devServer.options.port
                const https = devServer.options.https ? 's' : ''
                const localIp = ip.v4.sync()
                const domain1 = `http${https}://${localIp}:${port}`
                const domain2 = `http${https}://localhost:${port}`
                
                console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`)
            }
        }
    }
)
