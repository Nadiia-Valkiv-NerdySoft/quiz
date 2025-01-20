export default {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!d3-selection|internmap|d3-*|@swimlane/ngx-charts|.*\\.mjs$)',
  ],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports',
        filename: 'test-report.html',
        openReport: false,
      },
    ],
  ],
};
