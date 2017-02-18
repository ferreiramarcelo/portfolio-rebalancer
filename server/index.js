import express from 'express';
import webpack from 'webpack';
import expressForceHttps from 'express-force-https';
import { ENV } from './config/appConfig';
import { connect } from './db';
import passportConfig from './config/passport';
import expressConfig from './config/express';
import routesConfig from './config/routes';
import renderMiddleware from '../app/server';

const app = express();
connect();
passportConfig();
if (ENV === 'development') {
  const webpackDevConfig = require('../webpack/webpack.config.dev-client');

  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

expressConfig(app);
app.use((req, res, next) => {
    GLOBAL.navigator = {
        userAgent: req.headers['user-agent']
    };
    next();
});
app.use(expressForceHttps);
routesConfig(app);

app.get('*', renderMiddleware);
app.listen(app.get('port'));
