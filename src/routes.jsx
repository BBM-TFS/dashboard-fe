import * as solid from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Upload, DownloadFile } from "@/pages/dashboard";

import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "",
    pages: [
      {
        icon: <solid.HomeIcon {...icon} />,
        name: "dashboard",
        path: "/",
        element: <Home />,
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      {
        icon: <solid.InformationCircleIcon {...icon} />,
        name: "Inventory",
        path: "/invoice",
        element: <Notifications />,
      },
      {
        icon: <solid.TableCellsIcon {...icon} />,
        name: "Reports",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <solid.TableCellsIcon {...icon} />,
        name: "Upload",
        path: "/upload",
        element: <Upload />,
      },
      {
        icon: <solid.TableCellsIcon {...icon} />,
        name: "Download",
        path: "/download",
        element: <DownloadFile />,
      },
      {
        icon: <solid.InformationCircleIcon {...icon} />,
        name: "Expense",
        path: "/expense",
        element: <Profile />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      // {
      //   icon: <ServerStackIcon {...icon} />,
      //   name: "sign in",
      //   path: "/sign-in",
      //   element: <SignIn />,
      // },
      // {
      //   icon: <RectangleStackIcon {...icon} />,
      //   name: "sign up",
      //   path: "/sign-up",
      //   element: <SignUp />,
      // },
    ],
  },
];

export default routes;
