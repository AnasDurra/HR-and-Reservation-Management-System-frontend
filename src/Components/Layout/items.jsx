import {
  ApartmentOutlined,
  LockOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  HistoryOutlined,
  ProfileOutlined,
  ContainerOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';

import Permissions from '../AccessRoute/Permissions';

export const items = [
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
        text: 'اجهزة البصمات',
        path: '/biometricDevices',
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

    items: [
      {
        text: 'جدول المواعيد',
        path: '/appointments/calendar',
      },
      {
        text: 'جداول الدوام',
        path: '/consultant/timeSchedules',
      },
      {
        text: 'جدول مواعيد المستشار',
        path: '/consultant/calendar',
      },
    ],
  },
];
