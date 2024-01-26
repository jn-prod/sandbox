/* eslint-disable no-console */
import './styles/global.scss';
import { messages } from './locales';

import hello from './components/atoms/hello/hello';

const run = (): void => {
  const app = document.querySelector('#app');
  const testMessage = `${hello} ${messages.welcome}`;

  console.log(testMessage);

  if (app) app.textContent = testMessage;
};

run();

export default run;
