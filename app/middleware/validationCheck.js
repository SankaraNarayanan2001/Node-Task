
const Joi = require('joi');

const validateRegistration = (req, res, next) => {
  const Domains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
  const info = Joi.object({
    FirstName: Joi.string().trim().min(2).pattern(/^[a-zA-Z]+$/)
      .messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty',
        'string.min': 'First name should have a minimum length of {#limit}',
        'string.pattern.base': 'First name must contain only letters',
      }),
    LastName: Joi.string().trim().min(2).pattern(/^[a-zA-Z]+$/)
      .messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty',
        'string.min': 'Last name should have a minimum length of {#limit}',
        'string.pattern.base': 'Last name must contain only letters',
      }),
    FatherName: Joi.string().trim().min(2).pattern(/^[a-zA-Z]+$/)
      .messages({
        'any.required': 'Father name is required',
        'string.empty': 'Father name cannot be empty',
        'string.min': 'Father name should have a minimum length of {#limit}',
        'string.pattern.base': 'Father name must contain only letters',
      }),
    MotherName: Joi.string().trim().min(2).pattern(/^[a-zA-Z]+$/)
      .messages({
        'any.required': 'Mother name is required',
        'string.empty': 'Mother name cannot be empty',
        'string.min': 'Mother name should have a minimum length of {#limit}',
        'string.pattern.base': 'Mother name must contain only letters',
      }),
    DateOfBirth: Joi.date().allow(null)
      .messages({
        'date.base': 'Invalid date of birth',
      }),
    Nationality: Joi.string().trim().valid(
      'Indian',
      'Albanian',
      'Algerian',
    ),
    Email: Joi.string().trim().email().custom((value, helpers) => {
      const domain = value.split('@')[1];
      if (!Domains.includes(domain)) {
        return helpers.message('Invalid email domain');
      }
      return value;
    }).messages({
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Invalid email format',
    }),
    Password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      .messages({
        'any.required': 'Password is required',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password should have a minimum length of {#limit}',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      }),

    Gender: Joi.string().valid('Male', 'Female', 'Other').allow(null)
      .messages({
        'any.only': 'Invalid gender',
      }),
    PhoneNumber: Joi.string().allow(null).pattern(/^[0-9]+$/).min(10).max(15)
      .messages({
        'string.pattern.base': 'Invalid phone number',
        'string.min': 'Phone number should have a minimum length of {#limit}',
        'string.max': 'Phone number should have a maximum length of {#limit}',
      }),
    Occupation: Joi.string().allow(null).min(2)
      .messages({
        'string.min': 'Occupation should have a minimum length of {#limit}',
      }),
    Native_Place: Joi.string().trim().min(2).max(20),
    First_Language: Joi.string().trim().min(2).max(20),
    Resume: Joi.string(),
    Address: Joi.string().trim().min(5)
      .messages({
        'any.required': 'Address is required',
        'string.empty': 'Address cannot be empty',
        'string.min': 'Address should have a minimum length of {#limit}',
      }),
    City: Joi.string().trim().min(2)
      .messages({
        'any.required': 'City is required',
        'string.empty': 'City cannot be empty',
        'string.min': 'City should have a minimum length of {#limit}',
      }),
    State: Joi.string().trim().min(2)
      .messages({
        'any.required': 'State is required',
        'string.empty': 'State cannot be empty',
        'string.min': 'State should have a minimum length of {#limit}',
      }),
    Country: Joi.string().trim().min(2)
      .messages({
        'any.required': 'Country is required',
        'string.empty': 'Country cannot be empty',
        'string.min': 'Country should have a minimum length of {#limit}',
      }),
    PostalCode: Joi.string().trim().regex(/^\d{4,10}$/)
      .messages({
        'any.required': 'Postal code is required',
        'string.empty': 'Postal code cannot be empty',
        'string.pattern.base': 'Invalid postal code',
      }),


    Degree: Joi.string().trim().allow('').optional()
      .messages({
        'number.base': 'Invalid year',
        'number.integer': 'Year must be an integer',
        'number.positive': 'Year must be a positive number',
      }),
    Institution: Joi.string().trim().allow('').optional(),
    Skills: Joi.string(),
    Graduation_Year: Joi.number().integer().positive().allow(null).optional(),
    FieldOfStudy: Joi.string().trim().allow('').optional(),
    Grade: Joi.string().trim()
      .messages({
        'any.required': 'Grade is required',
        'string.empty': 'Grade cannot be empty',
      }),

  });

  const { error: infoError } = info.validate(req.body);
  if (infoError) {
    return res.status(400).json({ error: infoError.details[0].message });
  }
  next();
};

module.exports = { validateRegistration };
