import dayjs from "dayjs";
import moment from "moment";
export const formatRequestBeforeSend = (formData) => {
  if (formData.previous_employment_record) {
    formData.previous_employment_record =
      formData.previous_employment_record.map((employment) => ({
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
  if (formData.passport) {
    formData.passport = {
      ...formData.passport,
      passport_date_of_issue:
        formData.passport.passport_date_of_issue.format("YYYY-MM-DD"),
    };
  }

  if (formData.personal_data)
    formData.personal_data = {
      ...formData.personal_data,
      birth_date: formData.personal_data.birth_date.format("YYYY-MM-DD"),
    };

  if (formData.job_data?.start_working_date)
    formData.job_data = {
      ...formData.job_data,
      start_working_date:
        formData.job_data.start_working_date.format("YYYY-MM-DD"),
    };
  if (formData.personal_card)
    formData.personal_card = {
      ...formData.personal_card,
      card_date_of_issue:
        formData.personal_card.card_date_of_issue.format("YYYY-MM-DD"),
    };

  if (formData.additionalLanguages) {
    formData.languages = formData.languages.concat(
      formData.additionalLanguages
    );
    delete formData.additionalLanguages;
  }

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
  if (formData.skills) {
    formData.skills = {
      ...formData.skills.map((array) => ({
        skill_name: array[array.length - 1],
      })),
    };
  }
  if (formData.certificates) {
    formData.certificates = formData.certificates.map((certificate) => ({
      ...certificate,
      file: certificate.file[0].originFileObj,
    }));
  }

  return formData;
};

export const formatRequestAfterReceive = (response) => {
  const birthDate = dayjs(response.employee_data.personal_data.birth_date);

  const startWorkingDate = dayjs(
    response.employee_data.job_data["start-working_date"]
  );
  const cardDateOfIssue = dayjs(
    response.employee_data.personal_card.card_date_of_issue
  );
  const education = response.employee_data.education.map((edu) => ({
    ...edu,
    date: [dayjs(edu.start_date), dayjs(edu.end_date)],
  }));

  const training_courses = response.employee_data.training_courses.map(
    (course) => ({
      ...course,
      date: [dayjs(course.start_date), dayjs(course.end_date)],
    })
  );

  const previous_employment_record =
    response.employee_data.previous_employment_record.map((course) => ({
      ...course,
      date: [dayjs(course.start_date), dayjs(course.end_date)],
    }));

  var passport = undefined;
  if (response.passport) {
    var passport = {
      ...response.employee_data.passport,
      passport_date_of_issue: dayjs(
        response.employee_data.passport.passport_date_of_issue
      ),
    };
  }

  return {
    ...response,
    job_application: {
      ...response.job_application,
      job_vacancy: {
        ...response.job_application.job_vacancy,
      },
    },
    employee_data: {
      ...response.employee_data,
      personal_data: {
        ...response.employee_data.personal_data,
        birth_date: birthDate,
      },
      job_data: {
        ...response.employee_data.job_data,
        "start-working_date": startWorkingDate,
      },
      personal_card: {
        ...response.employee_data.personal_card,
        card_date_of_issue: cardDateOfIssue,
      },
      passport,
      education,
      training_courses,
      previous_employment_record,
    },
  };
};
