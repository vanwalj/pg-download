'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const Promise = require('bluebird');
const download = require('download');

const currentArch = os.arch();
const currentPlatform = os.platform();
const defaultCacheDir = path.join(os.homedir(), '.postgresql');
const mkdirAsync = Promise.promisify(fs.mkdir, { context: fs });

const osMap = {
  'win32-x64': 'win64'
};

module.exports = ({ version = '9.5.3', arch = currentArch, platform = currentPlatform, cache = defaultCacheDir } = {}) =>
  mkdirAsync(cache)
    .catch(() => null)
    .tap(() => console.log(`http://www.enterprisedb.com/postgresql-${version.replace(/\./g, '')}-binaries-${ osMap[`${platform}-${arch}`] }`))
    .then(() =>
      download(`http://www.enterprisedb.com/postgresql-${version.replace(/\./g, '')}-binaries-${ osMap[`${platform}-${arch}`] }`, cache)
    )
;

module.exports();
