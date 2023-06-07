import { Card, Col, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CustomCard = ({ title, deleteTitle, deleteDescription, onDelete, editMode,children } ) => {
  return (
    <Card
      hoverable={true}
      className="card"
      title={
        <div style={{ display: "flex", flexDirection: "Row" }}>
          <div>
            {editMode && (
              <Col span={2}>
                <Popconfirm
                  title={deleteTitle}
                  description={deleteDescription}
                  onConfirm={onDelete}
                  okText="نعم"
                  cancelText="لا"
                  placement="leftTop"
                >
                  <DeleteOutlined className="delete-icon" />
                </Popconfirm>
              </Col>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexGrow: "1",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {title}
          </div>
        </div>
      }
    >
      {children}
    </Card>
  );
};

export default CustomCard;
