// https://prototyp.digital/blog/multi-language-routing-in-react
import App from '@/App';
import ErrorPage from '@/pages/error-page';
import Practice from '@/pages/practice';
import Learn from '@/pages/learn';

import {
  createBrowserRouter,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/:lang/practice",
        element: <Practice />,
      },
      {
        path: "/:lang/learn",
        element: <Learn />,
      }
    ]
  },
]);

export default router;