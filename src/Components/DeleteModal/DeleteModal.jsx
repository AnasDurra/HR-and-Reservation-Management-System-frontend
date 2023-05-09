import { Button, Modal } from "antd";

export default function DeleteModal({ open, handleOk, handleCancel }) {

    return (
        <Modal
            zIndex={1500}
            centered
            open={open}
            title="هل أنت متأكد من عملية الحذف؟"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    إلغاء
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    تأكيد
                </Button>,

            ]}
        />

    );
}