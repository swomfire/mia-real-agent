import axios from 'axios';
import Logger from '../logger';


export const send = async (content, recipients) => {
  const { SPARK_POST_API_URL, SPARK_POST_API_KEY } = process.env;
  if (!SPARK_POST_API_URL) {
    Logger.error('SPARK_POST_API_URL not found');
    return;
  }
  if (!SPARK_POST_API_KEY) {
    Logger.error('SPARK_POST_API_KEY not found');
    return;
  }
  try {
    const config = {
      headers: {
        Authorization: SPARK_POST_API_KEY,
      },
    };
    const data = {
      // Remove this in production
      options: {
        sandbox: true,
      },
      content,
      recipients,
    };
    const response = await axios.post(SPARK_POST_API_URL, data, config);
    console.log(response);
  } catch (error) {
    console.log(error);
    Logger.error('Error while trying to send mail', error);
  }
};

export const buildContent = (subject, text) => {
  const { SPARK_POST_DOMAIN } = process.env;
  if (!SPARK_POST_DOMAIN) {
    Logger.error('SPARK_POST_DOMAIN not found');
    return {};
  }
  return {
    from: SPARK_POST_DOMAIN,
    subject,
    text,
  };
};
