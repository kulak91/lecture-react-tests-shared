import { config } from 'dotenv';

config();

const { API_ORIGIN_URL, UNSTABLE_TEST_RETRIES_NUMBER } = process.env;

const ENV = {
  API_PATH: API_ORIGIN_URL as string,
  UNSTABLE_TEST_RETRIES_NUMBER: Number(UNSTABLE_TEST_RETRIES_NUMBER) ?? 0,
} as const;

export { ENV };
