export const dateRangePickerFormat = (dates, dateStrings) => {
  return {
    start_date: dateStrings[0],
    end_date: dateStrings[1],
  };
};

export const getFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

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

  formData = {
    ...formData,
    isTrainingCourses: undefined,
    isCertificate: undefined,
    isConvicted: undefined,
    isRelativeEmployeed: undefined,
    isReference: undefined,
  };

  /*   if (
    formData.personal_data &&
    formData.personal_data.personal_photo &&
    formData.personal_data.personal_photo.length > 0
  ) {
    const file = formData.personal_data.personal_photo[0].originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
      reader.onload = () => {
      formData.personal_data.personal_photo = reader.result;
      console.log(formData);
    };
  } */

  return formData;
};
