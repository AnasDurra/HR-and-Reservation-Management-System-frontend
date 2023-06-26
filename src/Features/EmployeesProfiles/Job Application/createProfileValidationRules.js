export const validationRules = {
  email: [{ type: "email" }, { max: 255 }],
  username: [{ max: 3 }, { required: true }],
  password: [{ max: 3 }, { required: true }],
  job_app_id: [{ required: true }],
  schedule_id: [{ required: true }],
  job_title_id: [{ required: true }],
};
