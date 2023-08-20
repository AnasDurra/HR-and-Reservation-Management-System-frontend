import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Input, DatePicker, Radio, Button, Form, Divider, Row, Col, FloatButton, Upload, message } from 'antd';
import { FrownOutlined, PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons/lib/icons';
import {
    certificatesAllowedTypes,
    certificatesRules,
    educationRules,
    trainingCoursesRules,
} from '../../../validationRules';
import { getFile } from '../../../utils/getFile';

const EducationForm = (props) => {
    const [errorFields, setErrorFields] = useState([]);

    const validateForm = () => {
        if (props.validateState !== undefined) {
            props.form
                .validateFields()
                .then((_) => {
                    props.setValidateState(true);
                })
                .catch((values) => {
                    props.setValidateState(false);
                    const errorFieldNames = values.errorFields.map((error) => error.name);
                    setErrorFields(errorFieldNames);
                });
        }
    };

    const debouncedValidateForm = debounce(validateForm, 1000);

    useEffect(() => {
        if (props.validateState === false) {
            props.form
                .validateFields()
                .then((_) => {
                    props.setValidateState(true);
                })
                .catch((values) => {
                    props.setValidateState(false);
                    const errorFieldNames = values.errorFields.map((errorField) => errorField.name);
                    setErrorFields(errorFieldNames);
                });
        }
    }, [props.validateState]);

    return (
        <div className={`form-container ${props.show ? '' : 'hidden'}`}>
            <Form
                form={props.form}
                layout='horizontal'
                onChange={debouncedValidateForm}
            >
                <Form.Item
                    name={['education', 0, 'education_level_id']}
                    initialValue={1}
                    noStyle
                >
                    <Input type='hidden' />
                </Form.Item>
                <Divider className='divider'> المرحلة الابتدائية</Divider>
                <Row gutter={16}>
                    <Col span={7}>
                        <Form.Item
                            label='اسم المدرسة'
                            name={['education', 0, 'univ_name']}
                            rules={educationRules.univName}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label='المدينة'
                            name={['education', 0, 'city']}
                            rules={educationRules.city}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            label='مدّة الدراسة'
                            name={['education', 0, 'date']}
                            rules={educationRules.duration}
                        >
                            <DatePicker.RangePicker onChange={debouncedValidateForm} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name={['education', 1, 'education_level_id']}
                    initialValue={2}
                    noStyle
                >
                    <Input type='hidden' />
                </Form.Item>
                <Divider className='divider'> المرحلة الإعدادية</Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='اسم المدرسة'
                            name={['education', 1, 'univ_name']}
                            rules={educationRules.univName}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='المدينة'
                            name={['education', 1, 'city']}
                            rules={educationRules.city}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='مدّة الدراسة'
                            name={['education', 1, 'date']}
                            rules={educationRules.duration}
                        >
                            <DatePicker.RangePicker onChange={debouncedValidateForm} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='الدرجة (الصف التاسع)'
                            name={['education', 1, 'grade']}
                            rules={educationRules.grade}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name={['education', 2, 'education_level_id']}
                    initialValue={3}
                    noStyle
                >
                    <Input type='hidden' />
                </Form.Item>
                <Divider className='divider'> المرحلة الثانويَة</Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='اسم المدرسة'
                            name={['education', 2, 'univ_name']}
                            rules={educationRules.univName}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='المدينة'
                            name={['education', 2, 'city']}
                            rules={educationRules.city}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={10}>
                        <Form.Item
                            label='مدّة الدراسة'
                            name={['education', 2, 'date']}
                            rules={educationRules.duration}
                        >
                            <DatePicker.RangePicker onChange={debouncedValidateForm} />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label='التخصَص'
                            name={['education', 2, 'specialize']}
                            rules={educationRules.specialize}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label='الدرجة (البكالوريا)'
                            name={['education', 2, 'grade']}
                            rules={educationRules.grade}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}></Row>

                <Form.Item
                    name={['education', 3, 'education_level_id']}
                    initialValue={4}
                    noStyle
                >
                    <Input type='hidden' />
                </Form.Item>
                <Divider className='divider'>دبلوم بعد الثانويَة</Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='اسم المدرسة'
                            name={['education', 3, 'univ_name']}
                            rules={educationRules.univName}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='المدينة'
                            name={['education', 3, 'city']}
                            rules={educationRules.city}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={10}>
                        <Form.Item
                            label='مدّة الدراسة'
                            name={['education', 3, 'date']}
                            rules={educationRules.duration}
                        >
                            <DatePicker.RangePicker onChange={debouncedValidateForm} />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label='التخصَص'
                            name={['education', 3, 'specialize']}
                            rules={educationRules.specialize}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label='الدرجة'
                            name={['education', 3, 'grade']}
                            rules={educationRules.grade}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name={['education', 4, 'education_level_id']}
                    initialValue={5}
                    noStyle
                >
                    <Input type='hidden' />
                </Form.Item>
                <Divider className='divider'>المرحلة الجامعيَة</Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='اسم الجامعة'
                            name={['education', 4, 'univ_name']}
                            rules={educationRules.univName}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='المدينة'
                            name={['education', 4, 'city']}
                            rules={educationRules.city}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={10}>
                        <Form.Item
                            label='مدّة الدراسة'
                            name={['education', 4, 'date']}
                            rules={educationRules.duration}
                        >
                            <DatePicker.RangePicker onChange={debouncedValidateForm} />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label='التخصَص'
                            name={['education', 4, 'specialize']}
                            rules={educationRules.specialize}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label='الدرجة'
                            name={['education', 4, 'grade']}
                            rules={educationRules.grade}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name={['education', 5, 'education_level_id']}
                    initialValue={6}
                    noStyle
                >
                    <Input type='hidden' />
                </Form.Item>
                <Divider className='divider'>الدراسات العليا</Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='اسم الجامعة'
                            name={['education', 5, 'univ_name']}
                            rules={educationRules.univName}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='المدينة'
                            name={['education', 5, 'city']}
                            rules={educationRules.city}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={10}>
                        <Form.Item
                            label='مدّة الدراسة'
                            name={['education', 5, 'date']}
                            rules={educationRules.duration}
                        >
                            <DatePicker.RangePicker onChange={debouncedValidateForm} />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label='التخصَص'
                            name={['education', 5, 'specialize']}
                            rules={educationRules.specialize}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label='الدرجة'
                            name={['education', 5, 'grade']}
                            rules={educationRules.grade}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='هل قمت بدورات تدريبية سابقاَ ؟'
                            name='isTrainingCourses'
                            rules={[{ required: true, message: 'يجب الإجابة على السؤال ' }]}
                        >
                            <Radio.Group
                                value={props.isTrainingCourse}
                                onChange={(e) => {
                                    props.setIsTrainingCourse(e.target.value);
                                }}
                            >
                                <Radio value={true}> نعم</Radio>
                                <Radio value={false}> لا</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                {props.isTrainingCourse && (
                    <Form.List
                        name='training_courses'
                        initialValue={''}
                    >
                        {(fields, { add, remove }) => {
                            if (fields.length === 0) {
                                add();
                            }
                            return (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div key={key}>
                                            <Divider className='divider'> {`كورس  ${name + 1}`}</Divider>
                                            <Row gutter={16}>
                                                <Col span={2}>
                                                    {name >= 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                                                </Col>
                                                <Col span={7}>
                                                    <Form.Item
                                                        {...restField}
                                                        label='اسم الكورس'
                                                        name={[name, 'course_name']}
                                                        rules={trainingCoursesRules.courseName}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={7}>
                                                    <Form.Item
                                                        {...restField}
                                                        label='اسم المعهد'
                                                        name={[name, 'institute_name']}
                                                        rules={trainingCoursesRules.instituteName}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={7}>
                                                    <Form.Item
                                                        {...restField}
                                                        label='التخصَص'
                                                        name={[name, 'specialize']}
                                                        rules={trainingCoursesRules.specialize}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={16}>
                                                <Col
                                                    span={7}
                                                    offset={4}
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        label='المدينة'
                                                        name={[name, 'city']}
                                                        rules={trainingCoursesRules.city}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={7}>
                                                    <Form.Item
                                                        {...restField}
                                                        label='المدَة'
                                                        name={[name, 'date']}
                                                        rules={[{ required: true }]}
                                                    >
                                                        <DatePicker.RangePicker onChange={debouncedValidateForm} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                    <Row>
                                        <Col>
                                            <Form.Item label='إضافة كورس'>
                                                <Button
                                                    type='dashed'
                                                    onClick={() => add()}
                                                    icon={<PlusOutlined />}
                                                >
                                                    إضافة
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            );
                        }}
                    </Form.List>
                )}

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='هل تملك شهادات تود رفعها ؟'
                            name='isCertificate'
                            rules={[{ required: true, message: 'يجب ملئ الحقل بالأعلى ' }]}
                        >
                            <Radio.Group
                                value={props.isCertificate}
                                onChange={(e) => {
                                    props.setIsCertificate(e.target.value);
                                }}
                            >
                                <Radio value={true}> نعم</Radio>
                                <Radio value={false}> لا</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                {props.isCertificate && (
                    <Form.List
                        name='certificates'
                        initialValue={''}
                    >
                        {(fields, { add, remove }) => {
                            if (fields.length === 0) {
                                add();
                            }
                            return (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div key={key}>
                                            <Divider className='divider'> {`الشهادة  ${name + 1}`}</Divider>
                                            <Row gutter={16}>
                                                <Col span={2}>
                                                    {name >= 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                                                </Col>
                                                <Col span={7}>
                                                    <Form.Item
                                                        {...restField}
                                                        label='الاسم'
                                                        name={[name, 'certificate_name']}
                                                        rules={certificatesRules.certificateName}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={7}>
                                                    <Form.Item
                                                        {...restField}
                                                        label='الملف'
                                                        name={[name, 'file']}
                                                        rules={[{ required: true }]}
                                                        getValueFromEvent={getFile}
                                                    >
                                                        {/*  TODO redvisit upload*/}
                                                        <Upload
                                                            listType='text'
                                                            maxCount={1}
                                                            accept='file'
                                                            customRequest={(file) => {
                                                                file.onSuccess(() => {});
                                                            }}
                                                            beforeUpload={(file) => {
                                                                const allowedTypes =
                                                                    certificatesAllowedTypes.split(',');
                                                                const fileType = file.type;
                                                                const isAllowed = allowedTypes.some((type) =>
                                                                    fileType.endsWith(type)
                                                                );
                                                                if (!isAllowed) {
                                                                    message.open({
                                                                        type: 'error',
                                                                        content: `يجب اختيار ملف من النوع ${allowedTypes.join(
                                                                            ', '
                                                                        )} فقط`,
                                                                        style: {
                                                                            marginTop: '20vh',
                                                                        },
                                                                    });
                                                                }
                                                                return isAllowed || Upload.LIST_IGNORE;
                                                            }}
                                                        >
                                                            <Button icon={<UploadOutlined />}>رفع ملف</Button>
                                                        </Upload>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                    <Row>
                                        <Col>
                                            <Form.Item label='إضافة شهادة'>
                                                <Button
                                                    type='dashed'
                                                    onClick={() => add()}
                                                    icon={<PlusOutlined />}
                                                >
                                                    إضافة
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            );
                        }}
                    </Form.List>
                )}
            </Form>
            <Button
                type='primary'
                onClick={() => {
                    props.onNext();
                }}
            >
                التالي
            </Button>
            {props.validateState === false && (
                <FloatButton
                    badge={{ dot: errorFields }}
                    onClick={() => {
                        props.form.getFieldInstance(errorFields[0]).focus();
                    }}
                    icon={<FrownOutlined style={{ color: 'red' }} />}
                />
            )}
        </div>
    );
};

export default EducationForm;
