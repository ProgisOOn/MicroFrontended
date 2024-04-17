import { App } from "@/components/App";
import { createBrowserRouter} from "react-router-dom";
import { LazyAbout } from "@/pages/About/About.lazy";
import { Suspense } from "react";

const routes = [
    {
      path: "/admin",
      element: <App />,
      children: [
        {
            path: '/admin/about',
            element: <Suspense fallback={'Loading...'}><LazyAbout /></Suspense>,
        },
      ]
    },
  ]

export const router = createBrowserRouter(routes);

export default routes;