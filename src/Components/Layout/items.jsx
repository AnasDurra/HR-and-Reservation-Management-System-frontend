import {
  DashboardOutlined,
 
  ApartmentOutlined, LockOutlined,
  FileDoneOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

export const items = [
    {
        text: 'الأقسام',
        icon: <ApartmentOutlined />,
        path: '/departments'
    },
    {
        text: 'الشواغر الوظيفية',
        icon: <DashboardOutlined />,
        path: '/jobVacancies',
    },
    {
        text: 'المسميات الوظيفية',
        icon: <LockOutlined />,
        items: [
            {
                text: 'المسميات الوظيفية',
                path: '/roles',
            },
            {
                text: 'تعديل صلاحيات موظف',
                path: '/changeEmployeePermissions',
            },
        ],
    },
    {
      text: "طلبات التوظيف",
      icon: <FileDoneOutlined />,
      path: "/jobApplications",
    },
    {
        text:"الموظّفين",
        icon: <FileDoneOutlined />,
        path: "/employees",
      },
      {
        text:"سجل الأحداث",
        icon: <HistoryOutlined />,
        path: "/log",
      },

];