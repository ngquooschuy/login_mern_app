import toast from "react-hot-toast";
import notify from "../assets/i18n/notification.json";
import regex from "../assets/constants/regex.constants";

export async function usernameValid(values) {
  const errors = usernameVerify({}, values);

  return errors;
}

export async function passwordValid(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

export async function resetPasswordValid(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_password) {
    errors.exist = toast.error(notify["password.isMatch"]);
  }

  return errors;
}

export async function emailValid(values) {
  const error = emailVerify({}, values);

  return error;
}

export async function registerValid(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

export async function profileValid(values){
    const errors = emailVerify({}, values);
    return errors;
}

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error(notify["username.required"]);
  } else if (values.username.includes(" ")) {
    error.username = toast.error(notify["username.invalid"]);
  }

  return error;
}

function passwordVerify(error = {}, values) {
  const isSpecialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error(notify["password.required"]);
  } else if (values.password.includes(" ")) {
    error.password = toast.error(notify["password.invalid"]);
  } else if (values.password.length < 4) {
    error.password = toast.error(notify["password.maxlength"]);
  } else if (!isSpecialCharacters.test(values.password)) {
    error.password = toast.error(notify["password.isSpecialCharacters"]);
  }

  return error;
}

function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}
