"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/create-account", (0, express_validator_1.body)("name_lastname").notEmpty().withMessage("Name cannot be empty"), (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"), (0, express_validator_1.body)("password")
    .isLength({ min: 8 })
    .withMessage("Password at least 8 characters"), (0, express_validator_1.body)("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error("Passwords do not match");
    }
    return true;
}), validation_1.handleInputErrors, authController_1.createAccount);
router.post("/confirm-account", (0, express_validator_1.body)("token").notEmpty().withMessage("Token cannot be empty"), validation_1.handleInputErrors, authController_1.confirmAccount);
router.post("/login", (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"), (0, express_validator_1.body)("password").notEmpty().withMessage("Password cannot be empty"), validation_1.handleInputErrors, authController_1.login);
router.post("/request-code", (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"), validation_1.handleInputErrors, authController_1.requestConfirmationCode);
router.post("/forgot-password", (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"), validation_1.handleInputErrors, authController_1.forgotPassword);
router.post("/validate-token", (0, express_validator_1.body)("token").notEmpty().withMessage("Token cannot be empty"), validation_1.handleInputErrors, authController_1.validateToken);
router.post("/update-password/:token", (0, express_validator_1.param)("token").isNumeric().withMessage("Invalid Token "), (0, express_validator_1.body)("password")
    .isLength({ min: 8 })
    .withMessage("Password at least 8 characters"), (0, express_validator_1.body)("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error("Passwords do not match");
    }
    return true;
}), validation_1.handleInputErrors, authController_1.updatePasswordWithToken);
router.get("/user", auth_1.authenticate, authController_1.user);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map