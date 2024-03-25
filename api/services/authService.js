const instructor = require("../models/instructorModel");
const student = require("../models/studentModel");
const { decryptPassword, checkEmailExist } = require("../utils/common");
const { mailTransporter } = require("../utils/mailTransporter");

module.exports = {
  studentSignUpUser,
  studentSigninUser,
  instructorSignupUser,
  forgotPasswordUser,
  setNewPasswordUser,
};

async function studentSignUpUser(payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const isSEmailExist = await checkEmailExist(student, payload?.email);
      const isIEmailExist = await checkEmailExist(instructor, payload?.email);

      if (isSEmailExist || isIEmailExist) {
        return reject({ message: "Email already exist!" });
      } else {
        const data = {
          firstName: payload?.firstName,
          lastName: payload?.lastName,
          email: payload?.email.toLowerCase(),
          password: payload?.password,
          industry: payload?.industry,
          branch: payload?.branch,
          preferredLearning: payload?.preferredLearning,
          preferredTimeFrom: payload?.preferredTimeFrom,
          preferredTimeTo: payload?.preferredTimeTo,
          role: 2,
        };
        const save = await student.create(data);

        if (save) {
          return resolve({
            message: "Account registered successfully",
          });
        }
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}

async function instructorSignupUser(payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const isSEmailExist = await checkEmailExist(student, payload?.email);
      const isIEmailExist = await checkEmailExist(instructor, payload?.email);

      if (isSEmailExist || isIEmailExist) {
        return reject({ message: "Email already exist!" });
      } else {
        const data = {
          firstName: payload?.firstName,
          lastName: payload?.lastName,
          email: payload?.email,
          password: payload?.password,
          gender: payload?.gender,
          YOE: payload?.YOE,
          industry: payload?.industry,
          AOE: payload?.AOE,
          role: 1,
        };
        const save = await instructor.create(data);
        if (save) {
          return resolve({
            message: "Account registered successfully",
          });
        }
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}

async function studentSigninUser(payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const isSEmailExist = await checkEmailExist(student, payload?.email);
      const isIEmailExist = await checkEmailExist(instructor, payload?.email);

      if (!isSEmailExist && !isIEmailExist) {
        return reject({ message: "Email doesn't exist!" });
      } else {
        const decryptPayloadPassword = decryptPassword(payload.password);
        let existPassword;
        if (isSEmailExist) {
          existPassword = isSEmailExist.password;
        } else {
          existPassword = isIEmailExist.password;
        }
        if (existPassword === decryptPayloadPassword) {
          return resolve({ message: "Login success!" });
        } else {
          return reject({ message: "Incorrect password" });
        }
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}

async function forgotPasswordUser(payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const isSEmailExist = await checkEmailExist(student, payload?.email);
      const isIEmailExist = await checkEmailExist(instructor, payload?.email);

      if (!isSEmailExist && !isIEmailExist) {
        return reject({
          message: "Email doesn't exist! Please check your email and try again",
        });
      } else {
        const recipientFirstName = isSEmailExist
          ? isSEmailExist.firstName
          : isIEmailExist?.firstName;

        const recipientEmail = isSEmailExist
          ? isSEmailExist?.email
          : isIEmailExist?.email;

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Set New Password</title>
        </head>
        <body>
          <p>Dear ${recipientFirstName || "User"},</p>
          <p>We have received a request to set a new password for your account. To proceed, please click the link below:</p>
          <a href="http://localhost:3000/set-new-password?email=${encodeURIComponent(
            recipientEmail
          )}">Set New Password</a>
          <p>Thank you,</p>
          <p>Talent Trade</p>
        </body>
        </html>
        `;

        let mailOptions = {
          subject: "Link to set new password",
          text: "Set New Password",
          html: htmlContent, // Attach HTML content
        };

        if (isSEmailExist) {
          mailOptions.to = isSEmailExist?.email;
        } else {
          mailOptions.to = isIEmailExist?.email;
        }
        const sendMail = await mailTransporter(mailOptions);
        if (sendMail) {
          return resolve({
            message:
              "An email has been sent to our email with instructions to reset your password.",
          });
        }
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}

async function setNewPasswordUser(payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const isSEmailExist = await checkEmailExist(student, payload?.email);
      const isIEmailExist = await checkEmailExist(instructor, payload?.email);

      let update;
      if (isSEmailExist) {
        update = await isSEmailExist.update({ password: payload?.newPassword });
      } else {
        update = await isIEmailExist.update({ password: payload?.newPassword });
      }
      if (update) {
        return resolve({
          message: "Your password has been updated successfully",
        });
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}
