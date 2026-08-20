import { createBrowserRouter } from "react-router";
import Root from "./layout/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Campus from "./pages/Campus";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "programs", Component: Programs },
      { path: "campus", Component: Campus },
      { path: "events", Component: Events },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
], { basename: import.meta.env.BASE_URL });
