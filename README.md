# SIS Custom - [![Build Status](https://travis-ci.org/ucberkeley/sis-custom-build.svg?branch=master)](https://travis-ci.org/ucberkeley/sis-custom-build) [![Dependency Status](https://david-dm.org/ucberkeley/sis-custom-build.svg)](https://david-dm.org/ucberkeley/sis-custom-build)

Serve the assets for [sis-custom](https://github.com/ucberkeley/sis-custom)

* [List of files](https://sis-custom-build.herokuapp.com/dist)
* [Zip file](https://sis-custom-build.herokuapp.com/dist/files_latest.zip)

## Installation

### Requirements

* [NodeJS](https://nodejs.org/)
* [Gulp](http://gulpjs.com/)

### Start the server locally

```
node server.js
```

### Heroku - Update remote server

#### Add Heroku as a Remote

```
heroku git:remote -a sis-custom-build
```

#### Push

```
git push heroku master
```

#### Config variables

```
heroku config:set SIS_ENABLE_SSL=1
```

## Contributing

1. Fork it!
1. Create a jira in the [SIS Replacement Project](https://jira.berkeley.edu/browse/SISRP)
1. Create your feature branch: `git checkout -b SISRP-XXXX-my-new-feature`
1. Commit your changes: `git commit -m 'SISRP-XXXX - Add some feature'`
1. Push to the branch: `git push origin SISRP-XXXX-my-new-feature`
1. Submit a pull request
