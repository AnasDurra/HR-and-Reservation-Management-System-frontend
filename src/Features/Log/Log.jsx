import React, { useState } from "react";
import { Button, Table, Tag } from "antd";
import EmployeeMiniCard from "./components/EmployeeMiniCard";
import { ProfileOutlined, WarningOutlined } from "@ant-design/icons";
import "./log.css";
import Filter from "./components/Filter";
import CreateProfileDrawer from "../EmployeesProfiles/Job Application/components/CreateProfileDrawer";
const columns = [
  {
    title: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {"الدرجة"}
      </div>
    ),
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
    title: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {" الحدث"}
      </div>
    ),
    dataIndex: ["action", "name"],
    key: "action_name",
    className: "column-two",
  },
  {
    title: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {" معرَف الفائم بالحدث"}
      </div>
    ),
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
              backgroundColor: "#f0f0f0",
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
    title: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {" معرفات المتأثرين بالحدث"}
      </div>
    ),
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
              backgroundColor: "#f0f0f0",
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
    title: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {" وصف الحدث"}
      </div>
    ),
    dataIndex: ["action", "description"],
    key: "action_description",
    className: "column-one",
  },
  {
    title: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {" التاريخ"}
      </div>
    ),

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

const getColorClass = (index) => {
  const classes = ["row-odd", "row-even"];
  return classes[index % classes.length];
};

const Log = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateProfileDrawer
        onClose={() => {
          setOpen(!open);
        }}
        open={open}
      employeeName={"انس ريش"}
      />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <Table
          className="my-table"
          columns={columns}
          dataSource={data}
          pagination={true}
          rowClassName={(record, index) => getColorClass(index)}
        />{" "}
        <div style={{ width: "22%", marginRight: "0.5rem" }}>
          <Filter />
        </div>
        <Button
          onClick={() => {
            setOpen(!open);
          }}
        ></Button>
      </div>
    </>
  );
};

export default Log;
