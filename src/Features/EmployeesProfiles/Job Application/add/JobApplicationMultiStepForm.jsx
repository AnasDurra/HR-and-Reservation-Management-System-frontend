import React, { useState, useEffect, useRef } from 'react';
import { Steps, Button, message, Form, FloatButton } from 'antd';
import GeneralInfoForm from './sub-forms/GeneralInfoForm';
import EmploymentForm from './sub-forms/EmploymentForm';
import DrivingLicenseForm from './sub-forms/DrivingLicenseForm';
import EducationForm from './sub-forms/EducationForm';
import SkillsForm from './sub-forms/SkillsForm';
import AdditionalForm from './sub-forms/AdditionalForm';
import { formatRequestBeforeSend } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { createJobApplication } from '../../../../redux/Features/Employee Profile/Job application/slice';
import { useNavigate } from 'react-router-dom';
import './style.css';

const JobApplicationMultiStepForm = () => {
  const jobApplicationsSlice = useSelector((state) => state.jobApplicationsSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMountedRef = useRef(false);

  const [currentStep, setCurrentStep] = useState(0);

  const [generalInfoForm] = Form.useForm();
  const [employmentForm] = Form.useForm();
  const [drivingLicenseForm] = Form.useForm();
  const [educationForm] = Form.useForm();
  const [skillsForm] = Form.useForm();
  const [additionalForm] = Form.useForm();

  const [generalInfoFormValidateState, setGeneralFormValidateState] = useState(undefined);
  const [employmentFormValidateState, setEmploymentFormValidateState] = useState(undefined);
  const [drivingLicenseFormValidateState, setDrivingLicenseFormValidateState] = useState(undefined);
  const [educationFormValidateState, setEducationFormValidateState] = useState(undefined);
  const [skillsFormValidateState, setSkillsFormValidateState] = useState(undefined);
  const [additionalFormValidateState, setAdditionalFormValidateState] = useState(undefined);

  const [isDependent, setIsDependent] = useState(undefined);
  const [isPassport, setIsPassport] = useState(undefined);
  const [isPrevEmployee, setIsPrevEmployee] = useState(undefined);
  const [isDriverLicense, setIsDriverLicense] = useState(undefined);
  const [isTrainingCourse, setIsTrainingCourse] = useState(undefined);
  const [isAdditionalLanguage, setIsAdditionalLanguage] = useState(undefined);
  const [isCertificate, setIsCertificate] = useState(undefined);
  const [isConvicted, setIsConvicted] = useState(undefined);
  const [isRelativeEmployee, setIsRelativeEmployee] = useState(undefined);
  const [isReference, setIsReference] = useState(undefined);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = () => {
    var formData = Object.assign(
      {},
      generalInfoForm.getFieldsValue(),
      employmentForm.getFieldsValue(),
      drivingLicenseForm.getFieldsValue(),
      educationForm.getFieldsValue(),
      skillsForm.getFieldsValue(),
      additionalForm.getFieldsValue()
    );

    dispatch(createJobApplication(formData));
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    switch (currentStep) {
      case 5:
        skillsForm
          .validateFields()
          .then((_) => {
            setSkillsFormValidateState(true);
          })
          .catch((_) => {
            setSkillsFormValidateState(false);
          });
      case 4:
        educationForm
          .validateFields()
          .then((_) => {
            setEducationFormValidateState(true);
          })
          .catch((_) => {
            setEducationFormValidateState(false);
          });
      case 3:
        if (isDriverLicense === undefined) {
          setDrivingLicenseFormValidateState(false);
        } else
          drivingLicenseForm
            .validateFields()
            .then((_) => {
              setDrivingLicenseFormValidateState(true);
            })
            .catch((_) => {
              setDrivingLicenseFormValidateState(false);
            });

      case 2:
        if (isPrevEmployee === undefined) {
          setEmploymentFormValidateState(false);
        } else
          employmentForm
            .validateFields()
            .then((_) => {
              setEmploymentFormValidateState(true);
            })
            .catch((_) => {
              setEmploymentFormValidateState(false);
            });

      case 1:
        generalInfoForm
          .validateFields()
          .then((_) => {
            setGeneralFormValidateState(true);
          })
          .catch((_) => {
            setGeneralFormValidateState(false);
          });
        break;
      default:
        break;
    }
  }, [currentStep]);

  useEffect(() => {
    if (isMountedRef.current) {
      if (jobApplicationsSlice.loading) {
        message.open({
          type: 'loading',
          content: 'جار الحفظ  ',
          style: {
            marginTop: '5vh',
          },
          duration: 0,
        });
      }
    } else {
      isMountedRef.current = true;
    }
  }, [jobApplicationsSlice.loading]);

  return (
    <>
      <div className='container'>
        <GeneralInfoForm
          show={currentStep === 0 ? true : false}
          onNext={handleNext}
          form={generalInfoForm}
          isDependent={isDependent}
          setIsDependent={setIsDependent}
          validateState={generalInfoFormValidateState}
          setValidateState={setGeneralFormValidateState}
          isPassport={isPassport}
          setIsPassport={setIsPassport}
        />
        <EmploymentForm
          show={currentStep === 1 ? true : false}
          onNext={handleNext}
          form={employmentForm}
          isPrevEmployee={isPrevEmployee}
          setIsPrevEmployee={setIsPrevEmployee}
          validateState={employmentFormValidateState}
          setValidateState={setEmploymentFormValidateState}
        />
        <DrivingLicenseForm
          show={currentStep === 2 ? true : false}
          onNext={handleNext}
          form={drivingLicenseForm}
          isDriverLicense={isDriverLicense}
          setIsDriverLicense={setIsDriverLicense}
          validateState={drivingLicenseFormValidateState}
          setValidateState={setDrivingLicenseFormValidateState}
        />
        <EducationForm
          show={currentStep === 3 ? true : false}
          onNext={handleNext}
          form={educationForm}
          validateState={educationFormValidateState}
          setValidateState={setEducationFormValidateState}
          isTrainingCourse={isTrainingCourse}
          setIsTrainingCourse={setIsTrainingCourse}
          isCertificate={isCertificate}
          setIsCertificate={setIsCertificate}
        />
        <SkillsForm
          show={currentStep === 4 ? true : false}
          onNext={handleNext}
          form={skillsForm}
          validateState={skillsFormValidateState}
          setValidateState={setSkillsFormValidateState}
          isAdditionalLanguage={isAdditionalLanguage}
          setIsAdditionalLanguage={setIsAdditionalLanguage}
        />
        <AdditionalForm
          show={currentStep === 5 ? true : false}
          onNext={handleNext}
          form={additionalForm}
          validateState={additionalFormValidateState}
          setValidateState={setAdditionalFormValidateState}
          isConvicted={isConvicted}
          setIsConvicted={setIsConvicted}
          isRelativeEmployee={isRelativeEmployee}
          setIsRelativeEmployee={setIsRelativeEmployee}
          isReference={isReference}
          setIsReference={setIsReference}
        />
        <div className='left-float'>
          <Steps
            current={currentStep}
            onChange={setCurrentStep}
            direction='vertical'
            items={[
              {
                title: 'معلومات عامَة',
                status:
                  generalInfoFormValidateState === false
                    ? 'error'
                    : generalInfoFormValidateState === true
                    ? 'finish'
                    : undefined,
              },
              {
                title: 'الأعمال السابقة',
                status:
                  employmentFormValidateState === false
                    ? 'error'
                    : employmentFormValidateState === true
                    ? 'finish'
                    : undefined,
              },
              {
                title: 'شهادة القيادة',
                status:
                  drivingLicenseFormValidateState === false
                    ? 'error'
                    : drivingLicenseFormValidateState === true
                    ? 'finish'
                    : undefined,
              },
              {
                title: 'التعليم',
                status:
                  educationFormValidateState === false
                    ? 'error'
                    : educationFormValidateState === true
                    ? 'finish'
                    : undefined,
              },
              {
                title: 'المهارات',
                status:
                  skillsFormValidateState === false ? 'error' : skillsFormValidateState === true ? 'finish' : undefined,
              },
              {
                title: 'معلومات اضافية',
                status:
                  additionalFormValidateState === false
                    ? 'error'
                    : additionalFormValidateState === true
                    ? 'finish'
                    : undefined,
              },
            ]}
          />
          <Button
            disabled={
              true &&
              (!generalInfoFormValidateState ||
                !employmentFormValidateState ||
                !drivingLicenseFormValidateState ||
                !educationFormValidateState ||
                !skillsFormValidateState)
            }
            onClick={() => {
              additionalForm
                .validateFields()
                .then((_) => {
                  setAdditionalFormValidateState(true);
                  try {
                    handleSubmit();
                  } catch (error) {
                    // handle errors that occur in handleSubmit separately
                    console.error('An error occurred while submitting the form:', error);
                  }
                })
                .catch((_) => {
                  setAdditionalFormValidateState(false);
                });
            }}
            style={{ width: '100%' }}
            type='primary'
          >
            حفظ
          </Button>
        </div>
      </div>
      <FloatButton.BackTop style={{ left: 94 }} />
    </>
  );
};

export default JobApplicationMultiStepForm;
