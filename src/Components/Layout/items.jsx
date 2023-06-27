import {
  ApartmentOutlined,
  LockOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  HistoryOutlined,
  ProfileOutlined,
  ContainerOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";

export const items = [
  {
    text: "الأقسام",
    icon: <ApartmentOutlined />,
    path: "/departments",
  },
  {
    text: "الشواغر الوظيفية",
    icon: <ReconciliationOutlined />,
    path: "/jobVacancies",
  },
  {
    text: "المسميات الوظيفية",
    icon: <LockOutlined />,
    path: "/roles",
  },
  {
    text: "إدارة الدوام",
    icon: <ClockCircleOutlined />,
    items: [
      {
        text: "فترات العمل",
        path: "/shifts",
      },
      {
        text: "اجهزة البصمات",
        path: "/biometricDevices",
      },
      {
        text: "سجل الدوام",
        path: "/timeSheetLog",
      },
      {
        text: "طلبات الإجازة",
        path: "/employees/vacations/requests",
      },
      {
        text: "إجازات الموظفين",
        path: "/employees/vacations",
      },
      {
        text: "طلبات إزاحة الدوام",
        path: "/employees/timeShiftRequests",
      },
      {
        text: "غيابات الموظفين",
        path: "/employees/absences",
      },
    ],
  },
  {
    text: "طلبات التوظيف",
    icon: <FileDoneOutlined />,
    path: "/jobApplications",
  },
  {
    text: "الموظّفين",
    icon: <ProfileOutlined />,
    path: "/employees",
  },
  {
    text: "سجل الأحداث",
    icon: <HistoryOutlined />,
    path: "/log",
  },
  {
    text: "التقارير",
    icon: <ContainerOutlined />,
    items: [
      {
        text: "تقارير الموظفين",
        path: "/employees/reports",
      },
    ],
  },
];
