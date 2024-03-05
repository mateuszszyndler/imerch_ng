// validators/Validator.js
import { check, validationResult } from "express-validator";

const Validator = (req, res, next) => {
  const validations = [];

  for (let field in req.body) {
    switch (typeof req.body[field]) {
      case "string":
        if (field === "email") {
          validations.push(check(field).isEmail().withMessage(`${field} must be a valid email`), check(field).contains(".").withMessage(`${field} must include a domain`));
        } else if (field === "password") {
          validations.push(check(field).isLength({ min: 8 }).withMessage(`${field} must be at least 8 characters`), check(field).matches(/\d/).withMessage(`${field} must contain at least one number`), check(field).matches(/\W/).withMessage(`${field} must contain at least one special character`));
        } else if (Date.parse(req.body[field])) {
          validations.push(check(field).isISO8601().withMessage(`${field} must be a valid date`));
        } else {
          validations.push(check(field).notEmpty().withMessage(`${field} must not be empty`));
        }
        break;
      case "number":
        validations.push(check(field).isNumeric().withMessage(`${field} must be a number`));
        break;
      case "boolean":
        validations.push(check(field).isBoolean().withMessage(`${field} must be a boolean`));
        break;
      case "object":
        if (Array.isArray(req.body[field])) {
          validations.push(check(field).isArray().withMessage(`${field} must be an array`), check(field).notEmpty().withMessage(`${field} must not be empty`));
        } else {
          validations.push(check(field).notEmpty().withMessage(`${field} must not be empty`));
        }
        break;
      default:
        validations.push(check(field).exists().withMessage(`${field} is of invalid type`));
    }
  }

  // run validations
  for (const validation of validations) {
    validation.run(req);
  }

  // gather up validation errors
  const errors = validationResult(req);

  // if errors are present, send them in response, else call next()
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export default Validator;
