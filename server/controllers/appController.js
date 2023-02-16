import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) resject({ error: "Pls use unique username" });

        resolve();
      });
    });

    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, email) {
        if (err) reject(new Error(err));
        if (email) resject({ error: "Pls use unique email" });

        resolve();
      });
    });

    Promise.all([existEmail, existUsername])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
              });

              user
                .save()
                .then((result) =>
                  res.status(200).send({ msg: "Register successful" })
                )
                .catch((error) => res.status(500).send({ msg: "Error" }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hash password",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have password" });
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              "secret",
              { expiresIn: "24h" }
            );
            return res.status(200).sen({
              msg: "Login successful",
              username: user.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password does not match" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "Username not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function getUser(req, res) {}

export async function updateUser(req, res) {}

export async function generateOTP(req, res) {}

export async function verifyOTP(req, res) {}

export async function createResetSession(req, res) {}

export async function resetPassword(req, res) {}
