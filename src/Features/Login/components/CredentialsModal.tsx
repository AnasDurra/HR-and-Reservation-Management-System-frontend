import { useEffect, useState } from "react";
import { Modal, Card, Typography, Space, Button, message } from "antd";
import {
  UserOutlined,
  KeyOutlined,
  InfoCircleOutlined,
  CopyOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./CredentialsModal.css";

const { Title, Text } = Typography;

interface CredentialsModalProps {
  autoOpen?: boolean;
  onClose?: () => void;
}

export default function CredentialsModal({
  autoOpen = true,
  onClose,
}: CredentialsModalProps) {
  const [isVisible, setIsVisible] = useState(autoOpen);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (autoOpen) {
      setIsVisible(true);
    }
  }, [autoOpen]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      message.success("تم النسخ إلى الحافظة!");
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const CredentialRow = ({
    label,
    value,
    fieldId,
  }: {
    label: string;
    value: string;
    fieldId: string;
  }) => (
    <div className="credential-row">
      <div className="credential-label-value">
        <Text className="label">{label}</Text>
        <code className="credential-value">{value}</code>
      </div>
      <Button
        type="text"
        size="small"
        icon={
          copiedField === fieldId ? (
            <CheckOutlined className="copy-icon success" />
          ) : (
            <CopyOutlined className="copy-icon" />
          )
        }
        onClick={() => copyToClipboard(value, fieldId)}
        className="copy-button"
      />
    </div>
  );

  return (
    <Modal
      open={isVisible}
      onCancel={() => {
        setIsVisible(false);
        if (onClose) onClose();
      }}
      footer={null}
      width={560}
      centered
      className="credentials-modal"
      closeIcon={<span className="close-icon">×</span>}
    >
      <div className="modal-content">
        <div className="modal-header">
          <div className="header-icon-wrapper">
            <InfoCircleOutlined className="header-icon" />
          </div>
          <Title level={3} className="modal-title">
            بيانات الدخول التجريبية
          </Title>
          <Text className="modal-subtitle">
            استخدم هذه البيانات للوصول إلى النظام
          </Text>
        </div>

        <Space direction="vertical" size={16} className="credentials-container">
          <Card className="credential-card employee-card">
            <div className="card-header">
              <div className="icon-wrapper employee">
                <UserOutlined className="card-icon" />
              </div>
              <Title level={4} className="card-title">
                تسجيل دخول الموظف
              </Title>
            </div>
            <Space direction="vertical" size={12} className="credentials-list">
              <CredentialRow
                label="اسم المستخدم"
                value="hadi2"
                fieldId="employee-username"
              />
              <CredentialRow
                label="كلمة المرور"
                value="12341234"
                fieldId="employee-password"
              />
            </Space>
          </Card>

          <Card className="credential-card consultant-card">
            <div className="card-header">
              <div className="icon-wrapper consultant">
                <KeyOutlined className="card-icon" />
              </div>
              <Title level={4} className="card-title">
                تسجيل دخول المستشار
              </Title>
            </div>
            <Space direction="vertical" size={12} className="credentials-list">
              <CredentialRow
                label="اسم المستخدم"
                value="tester"
                fieldId="consultant-username"
              />
              <CredentialRow
                label="كلمة المرور"
                value="12341234"
                fieldId="consultant-password"
              />
            </Space>
          </Card>

          <div className="info-banner">
            <InfoCircleOutlined className="info-icon" />
            <Text className="info-text">
              هذه بيانات تجريبية للاستخدام فقط في العروض التوضيحية.
            </Text>
          </div>
        </Space>
      </div>
    </Modal>
  );
}
