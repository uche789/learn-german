/** @type {import('jest').Config} */

module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx', 'json', 'node'],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["ts-jest"],
  },
  moduleNameMapper: {
    "\\.svg\\?react$": "<rootDir>/jest/mock-svg.tsx",
    "@/(.*)": ["<rootDir>/src/$1"],
    '\\.(css|scss)$': 'identity-obj-proxy',
    "remark-html": "<rootDir>/jest/mock-remarkHtml.ts",
    "remark": "<rootDir>/jest/mock-remark.ts"
  },  
}