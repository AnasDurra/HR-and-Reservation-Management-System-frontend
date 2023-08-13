import { Button, Col, DatePicker, Form, Input, Row, Typography, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addEvent, getEvent, updateEvent } from "../../redux/centerEvents/reducer";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import { PlusOutlined } from "@ant-design/icons";

function MaintainEvent() {

    const event = useSelector(state => state.eventsReducer.event);
    const loading = useSelector(state => state.eventsReducer.loading);
    const { custID: eventID } = useParams();

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (eventID) {
            dispatch(getEvent({ id: eventID }));
        }
    }, []);

    useEffect(() => {
        if (event) {
            form.setFieldsValue({

            });
        }
    }, [event]);

    const onFinish = (data) => {
        console.log(data);
        if (!event) {
            addEventFunction(data);
        } else {
            updateEventFunction(data);
        }
    }

    const addEventFunction = (data) => {
        // data.birth_date = dayjs(data.birth_date.$d).format('YYYY-MM-DD');
        dispatch(addEvent({ data: data, succeed: addEventSuccessed }));
    }

    const updateEventFunction = (data) => {
        data.id = eventID;
        // if (data.email === customer?.email) {
        //     console.log(data.email);
        //     delete data.email;
        // }
        // if (data.phone_number === customer?.phone_number) {
        //     delete data.phone_number;
        // }
        // if (data.phone === customer?.phone) {
        //     delete data.phone;
        // }
        // if (data.birth_date) {
        //     data.birth_date = dayjs(data.birth_date.$d).format('YYYY-MM-DD');
        // }
        // if (!data.national_number || data.national_number === customer?.national_number) {
        //     delete data.national_number;
        // }
        console.log(data);
        dispatch(updateEvent({ data: data, succeed: updateEventSuccessed }))
    }

    const addEventSuccessed = () => {
        navigate('/events');
    }

    const updateEventSuccessed = () => {
        navigate('/events');
    }

    function normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <Spinner loading={loading}>
            <div>
                <Typography.Title level={3}>{!event ? `إضافة فعاليّة` : `تعديل فعاليّة`}</Typography.Title>
                <Form
                    form={form}
                    size='middle'
                    name="eventForm"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row>
                        <Col span={11}>
                            <Form.Item
                                label="اسم الفعاليّة"
                                required={false}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال اسم الفعاليّة',
                                    },
                                ]}
                            >
                                <Input placeholder='الاسم' />
                            </Form.Item>
                        </Col>

                        <Col span={11} offset={2}>
                            <Form.Item
                                label="العنوان"
                                required={false}
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال العنوان',
                                    },
                                ]}
                            >
                                <Input placeholder='عنوان الفعاليّة' />
                            </Form.Item>
                        </Col>





                        <Col span={11}>
                            <Form.Item
                                name="date"
                                label="تاريخ الفعاليّة"
                                required={false}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder='التاريخ' />
                            </Form.Item>
                        </Col>

                        <Col span={11} offset={2}>
                            <Form.Item
                                name="date"
                                label="تاريخ انتهاء الإعلان"
                                required={false}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder='التاريخ' />
                            </Form.Item>
                        </Col>

                        <Col span={11}>
                            <Form.Item
                                label="رابط خارجي"
                                required={false}
                                name="link"
                            >
                                <Input placeholder='الرابط' />
                            </Form.Item>
                        </Col>

                        <Col span={11} offset={2}>
                            <Form.Item
                                label="وصف الفعاليّة"
                                required={false}
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال الوصف',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={3} placeholder="الوصف" />
                            </Form.Item>
                        </Col>



                        <Col span={11}>
                            <Form.Item
                                label="الصورة"
                                name="image"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[
                                    {
                                        // required: ingredient ? false : true,
                                        message: 'الرجاء اختيار صورة',
                                    },
                                ]}
                            >
                                <Upload
                                    // defaultFileList={ingredient ? [{
                                    //     url: `${IMAGE_URL}${ingredient?.image}`,
                                    // }] : []}
                                    listType="picture-card"
                                    beforeUpload={() => false}
                                    name="image"
                                    maxCount={1}
                                >
                                    {uploadButton}
                                </Upload>
                            </Form.Item>
                        </Col>

                        <Col span={11} offset={2}>
                            <Form.Item
                                label="العنوان الجانبي"
                                required={false}
                                name="subtitle"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال العنوان الجانبي',
                                    },
                                ]}
                            >
                                <Input placeholder="العنوان الجانبي" />
                            </Form.Item>
                        </Col>


                        <Form.Item>
                            <div className="bioModal">
                                <Button type="primary" htmlType="submit">
                                    تأكيد
                                </Button>
                                <Button key="back" onClick={() => navigate(-1)}>
                                    إلغاء
                                </Button>

                            </div>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        </Spinner>
    );
}

export default MaintainEvent;