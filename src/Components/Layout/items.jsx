import { DashboardOutlined, ProfileOutlined } from "@ant-design/icons";

export const items = [
    {
        text: 'الشواغر الوظيفية',
        icon: <DashboardOutlined />,
        items: [
            {
                text: 'جميع الشواغر',
                icon: <ProfileOutlined />,
                path: '/jobVacancies',
            },
            {
                text: 'إضافة شاغر وظيفي',
                icon: <ProfileOutlined />,
                path: '/jobVacancies/add',
            },
        ],
    },
    {
        text: 'الموظفين',
        icon: <ProfileOutlined />,
        path: '/employees',
    },
];