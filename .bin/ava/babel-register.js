const { dependencies } = require('@babel/polyfill');
require('@babel/polyfill');
require('@babel/register')({
  only: Object.keys(dependencies).reduce((acc, dependency) => {
    acc[acc.length] = `./node_modules/${dependency}/**/*.js`;
    return acc;
  }, [
    './index.next.js',
  ]),
});
