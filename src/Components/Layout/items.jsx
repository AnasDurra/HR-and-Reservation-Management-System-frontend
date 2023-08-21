import {
  ApartmentOutlined,
  LockOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  HistoryOutlined,
  ProfileOutlined,
  ContainerOutlined,
  ReconciliationOutlined,
  OneToOneOutlined,
  TeamOutlined,
  BellOutlined,
  HomeOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

import Permissions from '../AccessRoute/Permissions';

export const items = [
  {
    text: 'الرئيسيّة',
    icon: <HomeOutlined />,
    path: '/main',
  },
  {
    text: 'الأقسام',
    icon: <ApartmentOutlined />,
    path: '/departments',
    access: [Permissions.MANAGE_DEPARTMENTS],
  },
  {
    text: 'الشواغر الوظيفية',
    icon: <ReconciliationOutlined />,
    path: '/jobVacancies',
    access: [Permissions.MANAGE_JOB_VACANCIES],
  },
  {
    text: 'المسميات الوظيفية',
    icon: <LockOutlined />,
    path: '/roles',
    access: [Permissions.MANAGE_ROLES],
  },
  {
    text: 'إدارة الدوام',
    icon: <ClockCircleOutlined />,
    access: [Permissions.MANAGE_ATTENDANCE],
    items: [
      {
        text: 'فترات العمل',
        path: '/shifts',
      },
      {
        text: "اجهزة البصمة",
        path: "/biometricDevices",
      },
      {
        text: 'سجل الدوام',
        path: '/timeSheetLog',
      },
      {
        text: 'طلبات الإجازة',
        path: '/employees/vacations/requests',
      },
      {
        text: 'إجازات الموظفين',
        path: '/employees/vacations',
      },
      {
        text: 'طلبات إزاحة الدوام',
        path: '/employees/timeShiftRequests',
      },
      {
        text: 'غيابات الموظفين',
        path: '/employees/absences',
      },
    ],
  },
  {
    text: 'طلبات التوظيف',
    icon: <FileDoneOutlined />,
    path: '/jobApplications',
    access: [Permissions.MANAGE_JOB_APPLICATIONS],
  },
  {
    text: 'الموظّفين',
    icon: <ProfileOutlined />,
    path: '/employees',
    access: [Permissions.MANAGE_EMPLOYEES],
  },
  {
    text: 'سجل الأحداث',
    icon: <HistoryOutlined />,
    path: '/log',
    access: [Permissions.MANAGE_LOG],
  },
  {
    text: 'التقارير',
    icon: <ContainerOutlined />,
    items: [
      {
        text: 'تقارير الموظفين',
        path: '/employees/reports',
        access: [Permissions.EXPORT_REPORTS],
      },
    ],
  },
  {
    text: 'إدارة المواعيد',
    icon: <ContainerOutlined />,
    access: [Permissions.MANAGE_APPOINTMENTS],
    items: [
      {
        text: 'جدول المواعيد',
        path: '/appointments/calendar',
      },
      {
        text: 'المواعيد الملغاة',
        path: '/appointments/cancelled',
      },
    ],
  },
  {
    text: 'جدول مواعيد',
    icon: <CalendarOutlined />,
    path: '/consultant/calendar',
    userType: 2,
  },
  {
    text: 'جداول الدوام',
    icon: <CalendarOutlined />,
    path: '/consultant/timeSchedules',
    userType: 2,
  },
  {
    text: 'الاستشاريين',
    icon: <OneToOneOutlined />,
    path: '/consultants',
    access: [Permissions.MANAGE_CONSULTANTS],
  },
  {
    text: 'المستفيدين',
    icon: <TeamOutlined />,
    access: [Permissions.MANAGE_CUSTOMERS],
    items: [
      {
        text: 'جميع المستفيدين',
        path: '/customers',
      },
      {
        text: 'إجراء عملية كشف',
        path: '/customers/detect',
      },
    ],
  },
  {
    text: 'الفعاليّات',
    icon: <BellOutlined />,
    path: '/events',
    access: [Permissions.MANAGE_EVENTS],
  },
];
