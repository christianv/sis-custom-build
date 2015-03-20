var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
var server = http.createServer(app);
var env = process.env.NODE_ENV || 'development';
var shell = require('shelljs');
var chalk = require('chalk');
var serveIndex = require('serve-index');

/**
 * Make sure we only pass data over https
 */
var forceSSL = function(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

// When in production, force SSL
if (env === 'production') {
  app.use(forceSSL);
}

// List public for the static assets
app.use('/dist', serveIndex(__dirname + '/dist', {'icons': true}));

var echo = function(message) {
  shell.echo(chalk.green('Build: ') + message);
};

var build = function() {
  echo('Start ...');

  if (shell.test('-d', 'x-sis-custom')) {
    echo('Repo update');
    shell.cd('x-sis-custom');
    shell.exec('git pull');

    echo('Repo update dependencies');
    shell.exec('npm install');

    echo('Gulp build - Start');
    shell.exec('npm run build');

    echo('Copy dist directory');
    shell.cd('..');
    shell.exec('cp -TRv x-sis-custom/dist dist');

    app.use('/dist', express.static(__dirname + '/dist'));
  } else {
    echo(chalk.red('Initial fetch step is still happening'));
  }
};

// Listen to the /api/build
app.post('/api/build', function(req, res) {
  build();
  res.json({
    'status': 'ok'
  });
});

// Listen to the /ping
app.get('/api/ping', function(req, res) {
  res.json({
    'status': 'ok'
  });
});

var fetch = function() {
  if (!shell.test('-d', 'x-sis-custom') && !shell.test('-d', 'z-sis-custom')) {
    echo('Fetch - Repo clone - Start');
    shell.exec('git clone --depth 1 https://github.com/ucberkeley/sis-custom.git z-sis-custom');

    echo('Fetch - Install packages');
    shell.cd('z-sis-custom');
    shell.exec('npm install');
    echo('Fetch - Packages installed');
    shell.cd('..');
    shell.mv('z-sis-custom', 'x-sis-custom');
    build();
  }
};

var port = process.env.PORT || 5000;
server.listen(port);
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);

  // Clean up previous directories
  shell.exec('rm -r dist x-sis-custom z-sis-custom');

  // Initial Fetch
  fetch();
});
