import { cleanEnv, str } from 'envalid';

export const envalidate = () => {
  return cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'test', 'production', 'staging'],
    }),
    DB_URL: str(),
    REDIS_URL: str(),
    API_URL: str(),
    // REDIS_PORT: port(),
    // REDIS_PASSWORD: str(),
  });
};
