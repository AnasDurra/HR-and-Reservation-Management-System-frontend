export const validationRules = {
  email: [{ type: "email" }, { max: 255 }],
  username: [{ min: 3 }, { required: true }],
  password: [{ min: 3 }, { required: true }],
  job_app_id: [{ required: true }],
  schedule_id: [{ required: true }],
  job_title_id: [{ required: true }],
};
