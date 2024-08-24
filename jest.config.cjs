/** @type {import('jest').Config} */

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.ts'],
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.svg\\?react$": "<rootDir>/jest/mock-svg.tsx",
    "@/(.*)": ["<rootDir>/src/$1"],
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
}