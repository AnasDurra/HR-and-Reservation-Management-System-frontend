import {
  DashboardOutlined,
  ProfileOutlined,
  ApartmentOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

export const items = [
  {
    text: "الأقسام",
    icon: <ApartmentOutlined />,
    path: "/departments",
  },
  {
    text: "الشواغر الوظيفية",
    icon: <DashboardOutlined />,
    items: [
      {
        text: "جميع الشواغر",
        icon: <ProfileOutlined />,
        path: "/jobVacancies",
      },
      {
        text: "إضافة شاغر وظيفي",
        icon: <ProfileOutlined />,
        path: "/jobVacancies/add",
      },
    ],
  },
  {
    text: "الموظفين",
    icon: <ProfileOutlined />,
    path: "/employees",
  },
  {
    text: "طلب توظيف",
    icon: <FileDoneOutlined />,
    path: "/jobApplications/add",
  },
];
