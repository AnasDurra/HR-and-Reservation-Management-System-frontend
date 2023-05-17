import { DashboardOutlined, ApartmentOutlined, LockOutlined } from "@ant-design/icons";

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
    }
];