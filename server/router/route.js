import { Router } from "express";

const router = Router();

import * as controllers from "../controllers/appController.js";

router.route("/register").post(controllers.register);
// router.route("/registerMail").post();
router.route("/authentication").post((req, res) => res.end());
router.route("/login").post(controllers.login);

router.route("/user/:username").get(controllers.getUser);
router.route("/generateOTP").get(controllers.generateOTP);
router.route("/verifyOTP").get(controllers.verifyOTP);
router.route("/createResetSession").get(controllers.createResetSession);

router.route("/updateUser").put(controllers.updateUser);
router.route("/resetPassword").put(controllers.updateUser);

export default router;
