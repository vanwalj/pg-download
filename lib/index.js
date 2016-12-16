'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const download = require('download');

const currentArch = os.arch();
const currentPlatform = os.platform();

const osMap = {
  'win32-x64': 'win64',
  'darwin-x64': 'osx'
};

module.exports = ({
  version = '9.6.1-1',
  arch = currentArch,
  platform = currentPlatform,
  downloadDir = '/tmp',
} = {}) => {
  return download(`http://get.enterprisedb.com/postgresql/postgresql-${ version }-${ osMap[`${ platform }-${ arch }`] }-binaries.zip`, downloadDir, { extract: true })
    .then(response => ({ download: response, downloadDir }))
    .catch(e => console.error(e))
};
