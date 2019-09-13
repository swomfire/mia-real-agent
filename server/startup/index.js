import createMiaAccountTask from './createMiaAccount';
import createDefaultSystemVersion from './createDefaultSystemVersion';
import Logger from '../logger';

const startUpTask = async () => {
  await Promise.all([
    createMiaAccountTask(),
    createDefaultSystemVersion(),
  ]);
  Logger.info('Finished all start up tasks');
};

export default startUpTask;
