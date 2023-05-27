import { DashboardOutlined, ApartmentOutlined, LockOutlined, ClockCircleOutlined } from "@ant-design/icons";

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
        text: 'إدارة الدوام',
        icon: <ClockCircleOutlined />,
        items: [
            {
                text: 'فترات العمل',
                path: '/shifts'
            }
        ]
    }
];