import React, { useState } from "react";
import { Button, Collapse, Input, Select } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
const { Panel } = Collapse;

const Filter = ({ onFilter }) => {
  const [selectedItems, setSelectedItems] = useState();

  return (
    <Collapse size="large">
      <Panel header="الفلترة" key="1">
        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          value={selectedItems}
          onChange={setSelectedItems}
          style={{ width: "100%" }}
          options={[
            {
              label: "Manager",
              options: [
                { label: "Jack", value: "jack" },
                { label: "Lucy", value: "lucy" },
              ],
            },
            {
              label: "Engineer",
              options: [{ label: "yiminghe", value: "Yiminghe" }],
            },
          ]}
        />
      </Panel>
    </Collapse>
  );
};

export default Filter;
