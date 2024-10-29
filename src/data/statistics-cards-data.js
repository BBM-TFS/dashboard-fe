import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Total Revenue",
    value: "R460,500",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last month",
    },
  },
  {
    color: "red",
    icon: UserPlusIcon,
    title: "Total Expenses",
    value: "R70,462",
    footer: {
      color: "text-red-500",
      value: "-20%",
      label: "than last month",
    },
  },
  {
    color: "green",
    icon: UsersIcon,
    title: "Profit",
    value: "R219,300",
    footer: {
      color: "text-green-500",
      value: "+11%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Total Stock",
    value: "145",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than last month",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Sales",
    value: "R103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
  // {
  //   color: "yellow",
  //   icon: UserPlusIcon,
  //   title: "New Clients",
  //   value: "24",
  //   footer: {
  //     color: "text-red-500",
  //     value: "-2%",
  //     label: "than yesterday",
  //   },
  // },
  {
    color: "purple",
    icon: ChartBarIcon,
    title: "Cows",
    value: "100",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },,
  {
    color: "yellow",
    icon: UserPlusIcon,
    title: "Sheeps",
    value: "39",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Goats",
    value: "53",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
