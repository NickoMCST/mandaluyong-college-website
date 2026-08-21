import { createBrowserRouter } from "react-router";
import Root from "./layout/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Campus from "./pages/Campus";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Student Portal — a self-contained app (its own layout, sidebar, and pages)
// wired in as a sibling route tree so it keeps its own design untouched and
// never inherits the public site's header/footer chrome.
import PortalLayout from "./portal/PortalLayout";
import PortalDashboard from "./portal/pages/Dashboard";
import PortalAcademics from "./portal/pages/Academics";
import PortalEnrollment from "./portal/pages/Enrollment";
import PortalDocuments from "./portal/pages/Documents";
import PortalAnnouncements from "./portal/pages/Announcements";
import PortalSettings from "./portal/pages/Settings";

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
    {
      path: "/portal",
      Component: PortalLayout,
      children: [
        { index: true, Component: PortalDashboard },
        { path: "academics", Component: PortalAcademics },
        { path: "enrollment", Component: PortalEnrollment },
        { path: "documents", Component: PortalDocuments },
        { path: "announcements", Component: PortalAnnouncements },
        { path: "settings", Component: PortalSettings },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
