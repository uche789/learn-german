// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_APP_SPACE_ID: 'test',
        VITE_APP_ACCESS_TOKEN: 'test',
      },
    },
  },
  writable: true,
});