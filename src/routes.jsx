import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
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
        icon: <HomeIcon {...icon} />,
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
        icon: <InformationCircleIcon {...icon} />,
        name: "Inventory",
        path: "/invoice",
        element: <Notifications />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Reports",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Upload",
        path: "/upload",
        element: <Upload />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Download",
        path: "/download",
        element: <DownloadFile />,
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "Test",
      //   path: "/test",
      //   element: <Test />,
      // },
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
