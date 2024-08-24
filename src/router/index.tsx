import App from '@/App';

import {
  createBrowserRouter,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/practice",
    element: <div>About</div>,
  },
]);

export default router;