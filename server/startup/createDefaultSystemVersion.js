import SystemService from '../modules/system/system.service';
import Logger from '../logger';

export default async function () {
  try {
    Logger.info('[STARTUP TASKS] CREATING DEFAULT SYSTEM VERSION');
    const version = await SystemService.getCurrentVersion();
    if (version) {
      Logger.info('[STARTUP TASKS] DEFAULT SYSTEM VERSION HAS ALREADY CREATED');
      return;
    }
    const newVersion = await SystemService.insert({
      version: 'default',
    });
    if (newVersion) {
      const { _id } = newVersion;
      Logger.success(`[STARTUP TASKS] SUCCESSFULLY CREATED DEFAULT SYSTEM VERSION WITH ID: ${_id}`);
    }
  } catch (error) {
    Logger.error('[STARTUP TASKS] ERROR WHY TRYING TO CREATING DEFAULT SYSTEM VERSION', error);
  }
}
