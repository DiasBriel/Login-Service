export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['/migrations/', '/node_modules/'],
  testMatch: ['**/**/*.test.ts'],
  coverageReporters: ['text', 'html'],
}
