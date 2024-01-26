/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

module.exports = webpack => {
  const env = webpack.dev === true ? 'dev' : 'prod';
  // eslint-disable-next-line no-console
  console.log(`running ./webpack/webpack.${env}.js`);
  return require(`./webpack/webpack.${env}.js`);
};
