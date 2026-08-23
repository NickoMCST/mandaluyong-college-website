import { createBrowserRouter } from "react-router";
import Root from "./layout/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Campus from "./pages/Campus";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PortalLayout from "./portal/PortalLayout";
import Dashboard from "./portal/pages/Dashboard";
import Academics from "./portal/pages/Academics";
import Enrollment from "./portal/pages/Enrollment";
import Documents from "./portal/pages/Documents";
import Announcements from "./portal/pages/Announcements";
import Settings from "./portal/pages/Settings";
import Admin from "./pages/Admin";

export const router = createBrowserRouter(
  [
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
    { path: "/admin", Component: Admin },
    {
      path: "/portal",
      Component: PortalLayout,
      children: [
        { index: true, Component: Dashboard },
        { path: "academics", Component: Academics },
        { path: "enrollment", Component: Enrollment },
        { path: "documents", Component: Documents },
        { path: "announcements", Component: Announcements },
        { path: "settings", Component: Settings },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
