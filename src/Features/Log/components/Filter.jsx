import React, { useState } from "react";
import { Button, Col, Collapse, Input, Row, Select } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import { CheckOutlined, ReloadOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

const Filter = ({ onFilter }) => {
  const [selectedItems, setSelectedItems] = useState();

  return (
    <Collapse size="large" expandIconPosition="start">
      <Panel header="الترشيح" key="1">
  
          <Row gutter={16}>
            <Col span={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4>القائمين بالحدث</h4>
              </div>
              <Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{ width: "100%" }}
                options={[
                  {
                    label: "قسم التدريب",
                    options: [
                      { label: "Jack", value: "jack" },
                      { label: "Lucy", value: "lucy" },
                    ],
                  },
                  {
                    label: "قسم العمليات",
                    options: [{ label: "yiminghe", value: "Yiminghe" }],
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4>المتأثرين بالحدث</h4>
              </div>
              <Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{ width: "100%" }}
                options={[
                  {
                    label: "قسم التدريب",
                    options: [
                      { label: "Jack", value: "jack" },
                      { label: "Lucy", value: "lucy" },
                    ],
                  },
                  {
                    label: "قسم العمليات",
                    options: [{ label: "yiminghe", value: "Yiminghe" }],
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4> الأحداث</h4>
              </div>
              <Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{ width: "100%" }}
                options={[
                  {
                    label: "قسم التدريب",
                    options: [
                      { label: "Jack", value: "jack" },
                      { label: "Lucy", value: "lucy" },
                    ],
                  },
                  {
                    label: "قسم العمليات",
                    options: [{ label: "yiminghe", value: "Yiminghe" }],
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4> الدرجات</h4>
              </div>
              <Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{ width: "100%" }}
                options={[
                  {
                    label: "قسم التدريب",
                    options: [
                      { label: "Jack", value: "jack" },
                      { label: "Lucy", value: "lucy" },
                    ],
                  },
                  {
                    label: "قسم العمليات",
                    options: [{ label: "yiminghe", value: "Yiminghe" }],
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4> الفترة الزمنية</h4>
              </div>
              <Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{ width: "100%" }}
                options={[
                  {
                    label: "قسم التدريب",
                    options: [
                      { label: "Jack", value: "jack" },
                      { label: "Lucy", value: "lucy" },
                    ],
                  },
                  {
                    label: "قسم العمليات",
                    options: [{ label: "yiminghe", value: "Yiminghe" }],
                  },
                ]}
              />
            </Col>
            <Col span={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "160%",
                }}
              >
                <Button type="primary" style={{ width: "100%" }}>
                  <CheckOutlined />
                </Button>
              </div>
            </Col>
            <Col span={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "160%",
                }}
              >
                <Button type="primary" style={{ width: "100%" }}>
                  <ReloadOutlined />
                </Button>
              </div>
            </Col>
          </Row>
      </Panel>
    </Collapse>
  );
};

export default Filter;
