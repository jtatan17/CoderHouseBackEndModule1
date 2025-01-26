import { body, validationResult } from "express-validator";

const validateUser = [
  body("firstName")
    .notEmpty()
    .withMessage("The 'firstName' field is required.")
    .isAlpha()
    .withMessage("The 'firstName' must contain only alphabetic characters."),

  body("lastName")
    .notEmpty()
    .withMessage("The 'lastName' field is required.")
    .isAlpha()
    .withMessage("The 'lastName' must contain only alphabetic characters."),

  body("jobTitle")
    .notEmpty()
    .withMessage("The 'jobTitle' field is required.")
    .isLength({ min: 3 })
    .withMessage("The 'jobTitle' must be at least 3 characters long."),

  body("userPhone")
    .notEmpty()
    .withMessage("The 'userPhone' field is required.")
    .isLength({ min: 10, max: 15 })
    .withMessage("The 'userPhone' must be between 10 and 15 characters long.")
    .matches(/^[0-9\s-]+$/)
    .withMessage(
      "The 'userPhone' must contain only numbers, spaces, or dashes."
    ),

  body("userLocation")
    .notEmpty()
    .withMessage("The 'userLocation' field is required.")
    .isString()
    .withMessage("The 'userLocation' must be a valid string."),
];

const validateProduct = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("The 'title' field is required.")
    .isString()
    .withMessage("The 'title' must be a valid string.")
    .matches(/^[a-z\s]+$/)
    .withMessage(
      "The 'title' must contain only lowercase alphabetic characters and spaces."
    ),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("The 'category' field is required.")
    .isString()
    .withMessage("The 'category' must be a valid string.")
    .matches(/^[a-z\s]+$/)
    .withMessage(
      "The 'category' must contain only lowercase alphabetic characters and spaces."
    ),

  body("stock")
    .notEmpty()
    .withMessage("The 'stock' field is required.")
    .isInt({ min: 1 })
    .withMessage("The 'stock' must be a positive integer."),

  body("price")
    .notEmpty()
    .withMessage("The 'price' field is required.")
    .isFloat({ min: 0.01 })
    .withMessage("The 'price' must be a positive number greater than zero."),

  body("thumbnails")
    .optional()
    .isArray()
    .withMessage("The 'thumbnails' field must be an array.")
    .custom((value) => value.every((url) => typeof url === "string"))
    .withMessage("Each item in the 'thumbnails' array must be a string."),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  // If there are validation errors from the body validators
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Enforce lowercase field names
  const allowedFields = ["title", "category", "stock", "price", "thumbnails"];
  const receivedFields = Object.keys(req.body);

  // Check for invalid field names
  for (const field of receivedFields) {
    if (!allowedFields.includes(field)) {
      return res.status(400).json({
        errors: [
          {
            msg: `Invalid field name '${field}'. Field names must be lowercase.`,
            param: field,
          },
        ],
      });
    }
  }

  next();
};

export { validateUser, validateProduct, handleValidationErrors };
