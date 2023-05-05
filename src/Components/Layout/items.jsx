import { DashboardOutlined, ProfileOutlined } from "@ant-design/icons";

export const items = [
    {
        text: 'الشواغر الوظيفية',
        icon: <DashboardOutlined />,
        items: [
            {
                text: 'جميع الشواغر',
                icon: <ProfileOutlined />,
                path: '/products',
            },
            {
                text: 'إضافة شاغر وظيفي',
                icon: <ProfileOutlined />,
                path: '/add/products',
            },
        ],
    },
    {
        text: 'الموظفين',
        icon: <ProfileOutlined />,
        path: '/users',
    },
];