import type { Config } from 'jest';

const config: Config = {
  testTimeout: 30000,
  preset: 'ts-jest',
  testEnvironment: 'node',
};

export default config;
