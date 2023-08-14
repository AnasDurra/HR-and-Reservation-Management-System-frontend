import { Button, Col, DatePicker, Form, Input, Row, Typography, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addEvent, getEvent, updateEvent } from "../../redux/centerEvents/reducer";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import { PlusOutlined } from "@ant-design/icons";
import { IMAGE_URL } from "../../redux/utils/constants";

function MaintainEvent() {

    const event = useSelector(state => state.eventsReducer.event);
    const loading = useSelector(state => state.eventsReducer.loading);
    const { eventID } = useParams();

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
                title: event?.title,
                address: event?.address,
                description: event?.description,
                start_date: dayjs(event?.start_date),
                end_date: dayjs(event?.end_date),
                link: event?.link,
                side_address: event?.side_address,
            });
        }
    }, [event]);

    const createFormData = (data) => {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('address', data.address);
        formData.append('description', data.description);
        formData.append('start_date', data.start_date);
        formData.append('end_date', data.end_date);
        formData.append('link', data.link);
        formData.append('side_address', data.side_address);
        if (data.image) {
            formData.append('image', data.image[0].originFileObj);
        }

        return formData;
    }

    const onFinish = (data) => {
        console.log(data);
        if (!event) {
            addEventFunction(data);
        } else {
            updateEventFunction(data);
        }
    }

    const addEventFunction = (data) => {
        data.start_date = dayjs(data.start_date.$d).format('YYYY-MM-DD');
        data.end_date = dayjs(data.end_date.$d).format('YYYY-MM-DD');
        const formData = createFormData(data);
        console.log(data);
        dispatch(addEvent({ data: formData, succeed: addEventSuccessed }));
    }

    const updateEventFunction = (data) => {
        if (data.start_date) {
            data.start_date = dayjs(data.start_date.$d).format('YYYY-MM-DD');
        }
        if (data.end_date) {
            data.end_date = dayjs(data.end_date.$d).format('YYYY-MM-DD');
        }
        if (!data.image) {
            delete data.image;
        }
        console.log(data);
        const formData = createFormData(data);
        dispatch(updateEvent({ data: formData, id: eventID, succeed: updateEventSuccessed }))
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
                                name="title"
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
                                name="start_date"
                                label="تاريخ الفعاليّة"
                                required={false}
                            >
                                <DatePicker style={{ width: '100%' }} placeholder='التاريخ' />
                            </Form.Item>
                        </Col>

                        <Col span={11} offset={2}>
                            <Form.Item
                                name="end_date"
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
                                        required: event ? false : true,
                                        message: 'الرجاء اختيار صورة',
                                    },
                                ]}
                            >
                                <Upload
                                    defaultFileList={event ? [{
                                        url: `${IMAGE_URL}${event?.image}`,
                                    }] : []}
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
                                name="side_address"
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