export const formatRequestBeforeSend = (formData) => {
  
  if (formData.prevEmployments) {
    formData.prevEmployments = formData.prevEmployments.map((employment) => ({
      ...employment,
      start_date: employment.date
        ? employment.date[0].format("YYYY-MM-DD")
        : undefined,
      end_date: employment.date
        ? employment.date[1].format("YYYY-MM-DD")
        : undefined,
      date: undefined,
    }));
  }
  if (formData.education) {
    formData.education = formData.education.map((education) => ({
      ...education,
      start_date: education.date
        ? education.date[0]?.format("YYYY-MM-DD")
        : undefined,
      end_date: education.date
        ? education.date[1].format("YYYY-MM-DD")
        : undefined,
      date: undefined,
    }));
  }
  if (formData.training_courses) {
    formData.training_courses = formData.training_courses.map((course) => ({
      ...course,
      start_date: course.date[0]?.format("YYYY-MM-DD"),
      end_date: course.date[1]?.format("YYYY-MM-DD"),
      date: undefined,
    }));
  }

  if (formData.driving_license) {
    formData.driving_license = {
      ...formData.driving_license,
      start_date: formData.driving_license.date[0]?.format("YYYY-MM-DD"),
      end_date: formData.driving_license.date[1]?.format("YYYY-MM-DD"),
      date: undefined,
    };
  }
  formData.personal_data = {
    ...formData.personal_data,
    birth_date: formData.personal_data.birth_date.format("YYYY-MM-DD"),
  };
  formData.job_data = {
    ...formData.job_data,
    start_working_date:
      formData.job_data.start_working_date.format("YYYY-MM-DD"),
  };
  formData.personal_card = {
    ...formData.personal_card,
    card_date_of_issue:
      formData.personal_card.card_date_of_issue.format("YYYY-MM-DD"),
  };

  formData = {
    ...formData,
    isTrainingCourses: undefined,
    isCertificate: undefined,
    isConvicted: undefined,
    isRelativeEmployeed: undefined,
    isReference: undefined,
  };

  if (formData.personal_data && formData.personal_data.personal_photo) {
    formData.personal_data.personal_photo =
      formData.personal_data.personal_photo[0].originFileObj;
  }
  if(formData.skills){
    formData.skills= {
      ...formData.skills.map((array) => ({ skill_name: array[array.length - 1] })),
    };
  }

  return formData;
};
