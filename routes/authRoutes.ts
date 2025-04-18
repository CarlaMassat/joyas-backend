import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import {
  confirmAccount,
  createAccount,
  forgotPassword,
  login,
  requestConfirmationCode,
  updatePasswordWithToken,
  user,
  validateToken,
} from "../controllers/authController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post(
  "/create-account",
  body("name_lastname").notEmpty().withMessage("Name cannot be empty"),

  body("email").isEmail().withMessage("Invalid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password at least 8 characters"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  handleInputErrors,
  createAccount
);

router.post(
  "/confirm-account",

  body("token").notEmpty().withMessage("Token cannot be empty"),
  handleInputErrors,
  confirmAccount
);

router.post(
  "/login",

  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
  handleInputErrors,
  login
);

router.post(
  "/request-code",
  body("email").isEmail().withMessage("Invalid email"),
  handleInputErrors,
  requestConfirmationCode
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Invalid email"),
  handleInputErrors,
  forgotPassword
);

router.post(
  "/validate-token",
  body("token").notEmpty().withMessage("Token cannot be empty"),
  handleInputErrors,
  validateToken
);

router.post(
  "/update-password/:token",
  param("token").isNumeric().withMessage("Invalid Token "),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password at least 8 characters"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  handleInputErrors,
  updatePasswordWithToken
);

router.get("/user", authenticate, user);

export default router;