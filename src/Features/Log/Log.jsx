import React from "react";
import { Button, Table, Tag } from "antd";
import EmployeeMiniCard from "./components/EmployeeMiniCard";
import { ProfileOutlined, WarningOutlined } from "@ant-design/icons";
import "./style.css";
import Filter from "./components/Filter";
const columns = [
  {
    title: "حساسيَة الحدث",
    dataIndex: ["action", "severity"],
    key: "action_severity",
    className: "column-warning",
    render: (severity) => {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tag icon={<WarningOutlined />} color="#f5222d">{`  عالي`}</Tag>
        </div>
      );
    },
  },
  {
    title: " الحدث",
    dataIndex: ["action", "name"],
    key: "action_name",
    className: "column-two",
  },
  {
    title: "معرّف القائم بالحدث ",
    dataIndex: "user_id",
    key: "user_id",
    className: "column-one",

    render: (user_id) => {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Tag
            icon={<ProfileOutlined />}
            style={{
              backgroundColor: "#ffffff",
              fontSize: "14px",
              padding: "0.2rem",
            }}
            onClick={() => {}}
          >
            <span>{`  أنس ريش`}</span>
          </Tag>
        </div>
      );
    },
  },
  {
    title: "معرَفات المتأثرين بالحدث",
    dataIndex: "affected_user_id",
    key: "affected_user_id",
    className: "column-two",

    render: (affected_user_id) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexWrap: "wrap",
        }}
      >
        {affected_user_id.map((id) => (
          <Tag
            icon={<ProfileOutlined />}
            style={{
              backgroundColor: "#ffffff",
              fontSize: "14px",
              padding: "0.2rem",
            }}
            onClick={() => {}}
          >
            <span>{`  أنس ريش`}</span>
          </Tag>
        ))}
      </div>
    ),
  },

  {
    title: "وصف الحدث",
    dataIndex: ["action", "description"],
    key: "action_description",
    className: "column-one",
  },
  {
    title: "التاريخ",
    dataIndex: "date",
    key: "date",
    className: "column-two",
  },
];

const data = [
  {
    key: "1",
    user_id: 1,
    affected_user_id: [2, 4],
    action: {
      name: "delete",
      description: "delete student",
      severity: "high",
    },
    date: "2023-05-28",
  },

  {
    key: "1",
    user_id: 1,
    affected_user_id: [2, 4, 23, 23, 2],
    action: {
      name: "delete",
      description: "delete student",
      severity: "high",
    },
    date: "2023-05-28",
  },
  // Add more data objects here
];

const Log = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
      <div style={{marginBottom:"1rem"}}>
        <Filter />
      </div>
      <Table columns={columns} dataSource={data} pagination={true} />{" "}
    </div>
  );
};

export default Log;
