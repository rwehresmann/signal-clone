import Constants from 'expo-constants';
import env from './.env.js';

const ENV = {
  firebaseApiKey: env.firebaseApiKey,
  firebaseAuthDomain: env.firebaseAuthDomain,
  firebaseProjectId: env.firebaseProjectId,
  firebaseStorageBucket: env.firebaseStorageBucket,
  firebaseMessageSendId: env.firebaseMessageSendId,
  firebaseAppId: env.firebaseAppId,
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
 return ENV;
};

export default getEnvVars;

