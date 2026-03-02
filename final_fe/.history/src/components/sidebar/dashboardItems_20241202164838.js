import {
  Bell,
  BookOpen,
  Calendar,
  CheckSquare,
  Grid,
  Heart,
  Layout,
  List,
  PieChart,
  Sliders,
  MapPin,
  Users,
  Share,
  Settings,
  FileText,
  BarChart,
  UserCheck,
  Tool,
  Briefcase,
} from "react-feather";
import { ROLE } from "../../constants";

const featuresSection = [
  {
    href: "/accounts",
    icon: Users, // Changed to Users for account management
    title: "Quản lý tài khoản",
    roles: [ROLE.ADMIN],
  },
  {
    href: "/devices",
    icon: Settings, // Changed to Settings for device management
    title: "Quản lý thiết bị",
    roles: [ROLE.ADMIN, ROLE.MANAGER],
  },
  {
    href: "/types",
    icon: List,
    title: "Quản lý loại thiết bị",
    roles: [ROLE.ADMIN, ROLE.MANAGER],
  },
  {
    href: "/departments",
    icon: Briefcase, // Remains the same
    title: "Khoa/Viện",
    roles: [ROLE.ADMIN, ROLE.MANAGER],
  },
  {
    href: "/maintenances",
    icon: Tool, // Changed to Users to indicate groups of users
    title: "Bảo trì",
    roles: [ROLE.ADMIN, ROLE.MANAGER],
  },
  {
    href: "/loans",
    icon: Tool, // Changed to Users to indicate groups of users
    title: "Yêu cầu thiết bị",
    roles: [ROLE.ADMIN, ROLE.MANAGER],
  },

  {
    href: "/charts",
    icon: BarChart,
    title: "Charts",
    badge: "New",
  },
];

const pagesSection = [
  {
    href: "/dashboard",
    icon: BarChart, // Changed to BarChart for dashboards
    title: "Dashboards",
    badge: "5",
    children: [
      {
        href: "/dashboard/default",
        title: "Default",
      },
      {
        href: "/dashboard/analytics",
        title: "Analytics",
      },
      {
        href: "/dashboard/saas",
        title: "SaaS",
      },
      {
        href: "/dashboard/social",
        title: "Social",
      },
      {
        href: "/dashboard/crypto",
        title: "Crypto",
      },
    ],
  },
  {
    href: "/pages",
    icon: FileText, // Changed to FileText for pages
    title: "Pages",
    children: [
      {
        href: "/pages/profile",
        title: "Profile",
      },
      {
        href: "/pages/settings",
        title: "Settings",
      },
      {
        href: "/pages/clients",
        title: "Clients",
      },
      {
        href: "/pages/projects",
        title: "Projects",
      },
      {
        href: "/pages/invoice",
        title: "Invoice",
      },
      {
        href: "/pages/pricing",
        title: "Pricing",
      },
      {
        href: "/pages/tasks",
        title: "Tasks",
      },
      {
        href: "/pages/chat",
        title: "Chat",
        badge: "New",
      },
      {
        href: "/pages/blank",
        title: "Blank Page",
      },
    ],
  },
  {
    href: "/auth",
    icon: UserCheck, // Changed to UserCheck for authentication
    title: "Auth",
    children: [
      {
        href: "/auth/sign-in",
        title: "Sign In",
      },
      {
        href: "/auth/sign-up",
        title: "Sign Up",
      },
      {
        href: "/auth/reset-password",
        title: "Reset Password",
      },
      {
        href: "/auth/404",
        title: "404 Page",
      },
      {
        href: "/auth/500",
        title: "500 Page",
      },
    ],
  },
  {
    href: "/docs/introduction",
    icon: BookOpen, // Remains the same
    title: "Documentation",
  },
];

const componentsSection = [
  {
    href: "/ui",
    icon: Grid, // Remains the same
    title: "UI Elements",
    children: [
      {
        href: "/ui/alerts",
        title: "Alerts",
      },
      {
        href: "/ui/buttons",
        title: "Buttons",
      },
      {
        href: "/ui/cards",
        title: "Cards",
      },
      {
        href: "/ui/carousel",
        title: "Carousel",
      },
      {
        href: "/ui/embed-video",
        title: "Embed Video",
      },
      {
        href: "/ui/general",
        title: "General",
      },
      {
        href: "/ui/grid",
        title: "Grid",
      },
      {
        href: "/ui/modals",
        title: "Modals",
      },
      {
        href: "/ui/offcanvas",
        title: "Offcanvas",
      },
      {
        href: "/ui/tabs",
        title: "Tabs",
      },
      {
        href: "/ui/typography",
        title: "Typography",
      },
    ],
  },
  {
    href: "/icons",
    icon: Heart, // Remains the same
    title: "Icons",
    badge: "1500+",
    children: [
      {
        href: "/icons/feather",
        title: "Feather",
      },
      {
        href: "/icons/font-awesome",
        title: "Font Awesome",
      },
    ],
  },
  {
    href: "/forms",
    icon: CheckSquare, // Remains the same
    title: "Forms",
    children: [
      {
        href: "/forms/layouts",
        title: "Layouts",
      },
      {
        href: "/forms/basic-inputs",
        title: "Basic Inputs",
      },
      {
        href: "/forms/input-groups",
        title: "Input Groups",
      },
      {
        href: "/forms/floating-labels",
        title: "Floating Labels",
      },
    ],
  },
  {
    href: "/tables",
    icon: List, // Remains the same
    title: "Tables",
  },
];

const pluginsSection = [
  {
    href: "/form-plugins",
    icon: CheckSquare, // Remains the same
    title: "Form Plugins",
    children: [
      {
        href: "/form-plugins/advanced-inputs",
        title: "Advanced Inputs",
      },
      {
        href: "/form-plugins/formik",
        title: "Formik",
        badge: "New",
      },
      {
        href: "/form-plugins/editors",
        title: "Editors",
      },
    ],
  },
  {
    href: "/advanced-tables",
    icon: List, // Remains the same
    title: "Advanced Tables",
    children: [
      {
        href: "/advanced-tables/pagination",
        title: "Pagination",
      },
      {
        href: "/advanced-tables/column-sorting",
        title: "Column Sorting",
      },
      {
        href: "/advanced-tables/column-filtering",
        title: "Column Filtering",
      },
      {
        href: "/advanced-tables/row-expanding",
        title: "Row Expanding",
      },
      {
        href: "/advanced-tables/row-selection",
        title: "Row Selection",
      },
    ],
  },
  {
    href: "/charts",
    icon: BarChart, // Changed to BarChart for charts
    title: "Charts",
    badge: "New",
    children: [
      {
        href: "/charts/chartjs",
        title: "Chart.js",
      },
      {
        href: "/charts/apexcharts",
        title: "ApexCharts",
        badge: "New",
      },
    ],
  },
  {
    href: "/notifications",
    icon: Bell, // Remains the same
    title: "Notifications",
  },
  {
    href: "/maps",
    icon: MapPin, // Remains the same
    title: "Maps",
    children: [
      {
        href: "/maps/google-maps",
        title: "Google Maps",
      },
      {
        href: "/maps/vector-maps",
        title: "Vector Maps",
      },
    ],
  },
  {
    href: "/calendar",
    icon: Calendar, // Remains the same
    title: "Calendar",
  },
  {
    href: "/404",
    icon: Share, // Remains the same
    title: "Multi Level",
    children: [
      {
        href: "/404",
        title: "Two Levels",
        children: [
          {
            href: "/404",
            title: "Item 1",
          },
          {
            href: "/404",
            title: "Item 2",
          },
        ],
      },
      {
        href: "/404",
        title: "Three Levels",
        children: [
          {
            href: "/404",
            title: "Item 1",
            children: [
              {
                href: "/404",
                title: "Item 1",
              },
              {
                href: "/404",
                title: "Item 2",
              },
            ],
          },
          {
            href: "/404",
            title: "Item 2",
          },
        ],
      },
    ],
  },
];

const navItems = [
  {
    title: "",
    pages: featuresSection,
    roles: [ROLE.ADMIN, ROLE.MANAGER, ROLE.EMPLOYEE],
  },
  {
    title: "Pages",
    pages: pagesSection,
  },
  {
    title: "Tools & Components",
    pages: componentsSection,
  },
  {
    title: "Plugins & Addons",
    pages: pluginsSection,
  },
];

const getNavItems = (userRole) => {
  let items = cloneArray(navItems).filter(
    (item) => item.roles && item.roles.includes(userRole)
  );
  items.forEach((item) => {
    item.pages = item.pages.filter(
      (item) => item.roles && item.roles.includes(userRole)
    );
  });

  return items;
};

const cloneArray = (arr) => {
  return arr.map((i) => {
    return { ...i };
  });
};

export default getNavItems;
