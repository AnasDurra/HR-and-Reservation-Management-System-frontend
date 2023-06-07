export const imageAllowedTypes = "jpeg,png,jpg,gif,svg";
export const certificatesAllowedTypes = "pdf,doc,docx,jpeg,png,jpg";

// Personal data validation rules
export const personalDataRules = {
  firstName: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل الاسم الأول" },
  ],
  lastName: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل الكنية" },
  ],
  personalPhoto: [{ required: true, message: "يرجى تحميل الصورة الشخصية" }],
  fatherName: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل اسم الأب" },
  ],
  grandFatherName: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل اسم الجد" },
  ],
  birthDate: [
    { type: "date", message: "يرجى إدخال تاريخ صالح" },
    { required: true, message: "يرجى تعبئة حقل تاريخ الميلاد" },
  ],
  birthPlace: [
    { max: 80, message: "لا يمكن تجاوز 80 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل مكان الميلاد" },
  ],
  maritalStatus: [
    { pattern: new RegExp(/^[0-9]+$/), message: "يرجى تحديد حالة الزواج" },
    { required: true, message: "يرجى تعبئة حقل حالة الزواج" },
  ],
};

// Job data validation rules
export const jobDataRules = {
  startWorkingDate: [
    { type: "date", message: "يرجى إدخال تاريخ صالح" },
    { required: true, message: "يرجى تعبئة حقل تاريخ بدء العمل" },
  ],
  isEmployed: [
    { required: true, message: "يرجى تحديد ما إذا كنت موظفًا حاليًا" },
  ],
};

// Personal card validation rules
export const personalCardRules = {
  cardNumber: [
    {
      pattern: new RegExp(/^[0-9]+$/),
      message: "يرجى إدخال رقم صالح لبطاقة الهوية الشخصية",
    },
    { max: 25, message: "لا يمكن تجاوز 25 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل رقم بطاقة الهوية الشخصية" },
  ],
  cardPlaceOfIssue: [
    { max: 80, message: "لا يمكن تجاوز 80 حرفًا" },
    {
      required: true,
      message: "يرجى تعبئة حقل مكان إصدار بطاقة الهوية الشخصية",
    },
  ],
  cardDateOfIssue: [
    {
      type: "date",
      message: "يرجى إدخال تاريخ صالح لإصدار بطاقة الهوية الشخصية",
    },
    {
      required: true,
      message: "يرجى تعبئة حقل تاريخ إصدار بطاقة الهوية الشخصية",
    },
  ],
};

// Passport validation rules
export const passportRules = {
  passportNumber: [
    {
      pattern: new RegExp(/^[0-9]+$/),
      message: "يرجى إدخال رقم صالح لجواز السفر",
    },
    { max: 25, message: "لا يمكن تجاوز 25 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل رقم جواز السفر" },
  ],
  passportPlaceOfIssue: [
    { max: 80, message: "لا يمكن تجاوز 80 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل مكان إصدار جواز السفر" },
  ],
  passportDateOfIssue: [
    { type: "date", message: "يرجى إدخال تاريخ صالح لإصدار جواز السفر" },
    { required: true, message: "يرجى تعبئة حقل تاريخ إصدار جواز السفر" },
  ],
};

// Address validation rules
export const addressRules = {
  state: [
    { max: 50, message: "لا يمكن تجاوز 50 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل الولاية/الإقليم" },
  ],
  city: [
    { max: 50, message: "لا يمكن تجاوز 50 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل المدينة" },
  ],
  street: [
    { max: 70, message: "لا يمكن تجاوز 70 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل الشارع" },
  ],
  postalCode: [{ max: 10, message: "لا يمكن تجاوز 10 حرفًا" }],
  email: [
    { type: "email", message: "يرجى إدخال بريد إلكتروني صالح" },
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
  ],
  mobileNo: [
    { pattern: new RegExp(/^[0-9]+$/), message: "يرجى إدخال رقم هاتف صالح" },
    { max: 25, message: "لا يمكن تجاوز 25 حرفًا" },
  ],
  homePhoneNo: [
    { pattern: new RegExp(/^[0-9]+$/), message: "يرجى إدخال رقم هاتف صالح" },
    { max: 25, message: "لا يمكن تجاوز 25 حرفًا" },
  ],
  workPhoneNo: [
    { pattern: new RegExp(/^[0-9]+$/), message: "يرجى إدخال رقم هاتف صالح" },
    { max: 25, message: "لا يمكن تجاوز 25 حرفًا" },
  ],
};

// Driving license validation rules
export const drivingLicenseRules = {
  category: [{ max: 50, message: "لا يمكن تجاوز 50 حرفًا" }],
  number: [
    {
      pattern: new RegExp(/^[0-9]+$/),
      message: "يرجى إدخال رقم صالح لرخصة القيادة",
    },
    { max: 25, message: "لا يمكن تجاوز 25 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل رقم رخصة القيادة" },
  ],
  dateOfIssue: [
    { type: "date", message: "يرجى إدخال تاريخ صالح لإصدار رخصة القيادة" },
    { required: true, message: "يرجى تعبئة حقل تاريخ إصدار رخصة القيادة" },
  ],
  expiryDate: [
    {
      type: "date",
      message: "يرجى إدخال تاريخ صالح لانتهاء صلاحية رخصة القيادة",
    },
    {
      required: true,
      message: "يرجى تعبئة حقل تاريخ انتهاء صلاحية رخصة القيادة",
    },
  ],
  placeOfIssue: [
    { max: 80, message: "لا يمكن تجاوز 80 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل مكان إصدار رخصة القيادة" },
  ],
  bloodGroup: [
    { max: 25, message: "لا يمكن تجاوز 25 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل فصيلة الدم" },
  ],
};

export const dependentsRules = {
  name: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل الاسم" },
  ],
  age: [
    { pattern: new RegExp(/^[0-9]+$/), message: "يرجى إدخال عمر صالح" },
    { max: 3, message: "يرجى إدخال عمر صالح" },
    { required: true, message: "يرجى تعبئة حقل العمر" },
  ],
  relationship: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل العلاقة" },
  ],
  address: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل العنوان" },
  ],
};

// Previous employment record validation rules
export const previousEmploymentRecordRules = {
  employerName: [
    { required: true, message: "يرجى تعبئة حقل اسم العامل السابق" },
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
  ],
  address: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل العنوان" },
  ],
  jobTitle: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل الوظيفة" },
  ],
  jobDescription: [{ required: true, message: "يرجى تعبئة حقل وصف الوظيفة" }],
  startDate: [
    { type: "date", message: "يرجى إدخال تاريخ صالح بالصيغة yyyy-mm-dd" },
    { required: true, message: "يرجى تعبئة حقل تاريخ بدء العمل" },
  ],
  endDate: [
    {
      type: "date",
      message: "يرجى إدخال تاريخ صالح بالصيغة yyyy-mm-dd لتاريخ انتهاء العمل",
    },
    { required: true, message: "يرجى تعبئة حقل تاريخ انتهاء العمل" },
  ],
  salary: [
    { pattern: new RegExp(/^[0-9]+$/), message: "يرجى إدخال راتب صالح" },
    { required: true, message: "يرجى تعبئة حقل الراتب" },
  ],
  allowance: [
    { pattern: new RegExp(/^[0-9]+$/), message: "يرجى إدخال علاوة صالحة" },
    { required: true, message: "يرجى تعبئة حقل العلاوة" },
  ],
  quitReason: [{ max: 255, message: "لا يمكن تجاوز 255 حرفًا" }],
  telephone: [
    { pattern: new RegExp(/^[0-9]+$/), message: "يرجى إدخال رقم هاتف" },
    { max: 25, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل العلاوة" },
  ],
};

// Convictions validation rules
export const convictionsRules = {
  description: [{ required: true, message: "يرجى تعبئة حقل وصف المحاكمة" }],
};

// Education validation rules
export const educationRules = {
  univName: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل الاسم" },
  ],
  city: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل المدينة" },
  ],
  startDate: [
    {
      type: "date",
      message: "يرجى إدخال تاريخ صالح بالصيغة yyyy-mm-dd لتاريخ بدء الدراسة",
    },
    { required: true, message: "يرجى تعبئة حقل تاريخ بدء الدراسة" },
  ],
  endDate: [
    {
      type: "date",
      message: "يرجى إدخال تاريخ صالح بالصيغة yyyy-mm-dd لتاريخ انتهاء الدراسة",
    },
    { required: true, message: "يرجى تعبئة حقل تاريخ انتهاء الدراسة" },
  ],
  specialize: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل التخصص" },
  ],
  grade: [
    {
      pattern: new RegExp(/^[0-9]+(\.[0-9]+)?$/),
      message: "يرجى إدخال درجة صالحة ",
    },
    { required: true, message: "يرجى تعبئة حقل الدرجة" },
  ],
  educationLevelId: [
    { required: true, message: "يرجى تعبئة حقل مستوى التعليم" },
  ],
  duration: [
    { required: true, message: "يرجى تعبئة حقل مدة الدراسة" },
  ],
};

// Training courses validation rules
export const trainingCoursesRules = {
  courseName: [
    { max: 255, message: "لا يمكن تجاوز الحد المسموح للأحرف: 255" },
    { required: true, message: "يجب ملئ الحقل بالأعلى" },
  ],
  instituteName: [
    { max: 255, message: "لا يمكن تجاوز الحد المسموح للأحرف: 255" },

    { required: true, message: "يجب ملئ الحقل بالأعلى" },
  ],
  city: [
    { max: 255, message: "لا يمكن تجاوز الحد المسموح للأحرف: 255" },

    { required: true, message: "يجب ملئ الحقل بالأعلى" },
  ],
  startDate: [
    {
      type: "date",
      message: "تاريخ بدء الدورة يجب أن يكون بالصيغة yyyy-mm-dd",
    },
    { required: true, message: "يجب ملئ الحقل بالأعلى" },
  ],
  endDate: [
    {
      type: "date",
      message: "تاريخ انتهاء الدورة يجب أن يكون بالصيغة yyyy-mm-dd",
    },
    { required: true, message: "يجب ملئ الحقل بالأعلى" },
  ],
  specialize: [
    { max: 255, message: "لا يمكن تجاوز الحد المسموح للأحرف: 255" },

    { required: true, message: "يجب ملئ الحقل بالأعلى" },
  ],
};

// Skills validation rules
export const skillsRules = {
  skillName: [
    { required: true, message: "يرجى تعبئة حقل اسم المهارة" },
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
  ],
};

// Languages validation rules
export const languagesRules = {
  languageName: [
    { required: true, message: "يرجى تعبئة حقل اسم اللغة" },
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
  ],
  reading: [{ required: true, message: "يرجى تحديد مستوى القراءة" }],
  writing: [{ required: true, message: "يرجى تحديد مستوى الكتابة" }],
  speaking: [{ required: true, message: "يرجى تحديد مستوى التحدث" }],
};

// Computer skills validation rules
export const computerSkillsRules = {
  skillName: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل اسم المهارة الحاسوبية" },
  ],
  level: [{ required: true, message: "يرجى تحديد مستوى المهارة الحاسوبية" }],
};

// Relatives validation rules
export const relativesRules = {
  empId: [],
};

// References validation rules
export const referencesRules = {
  name: [
    { max: 70, message: "لا يمكن تجاوز 70 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل اسم المرجع" },
  ],
  job: [
    { max: 70, message: "لا يمكن تجاوز 70 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل وظيفة المرجع" },
  ],
  company: [
    { max: 70, message: "لا يمكن تجاوز 70 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل اسم الشركة" },
  ],
  telephone: [
    { pattern: new RegExp(/^[0-9]+$/), message: "يرجى إدخال رقم هاتف صالح" },
    { max: 25, message: "لا يمكن تجاوز 25 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل رقم الهاتف" },
  ],
  address: [{ required: true, message: "يرجى تعبئة حقل العنوان" }],
};

// Certificates validation rules
export const certificatesRules = {
  certificateName: [
    { max: 255, message: "لا يمكن تجاوز 255 حرفًا" },
    { required: true, message: "يرجى تعبئة حقل اسم الشهادة" },
  ],
  file: [{ required: true, message: "يرجى تحميل ملف الشهادة" }],
};
