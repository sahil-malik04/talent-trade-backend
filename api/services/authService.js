const instructors = require("../models/instructorModel");
const learners = require("../models/learnerModel");

const {
  decryptData,
  checkEmailExist,
  generateToken,
} = require("../utils/common");
const { mailTransporter } = require("../utils/mailTransporter");

module.exports = {
  learnerSignUpUser,
  signInUser,
  instructorSignupUser,
  forgotPasswordUser,
  setNewPasswordUser,
};

async function learnerSignUpUser(payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const isLEmailExist = await checkEmailExist(learners, payload?.email);
      const isIEmailExist = await checkEmailExist(instructors, payload?.email);

      if (isLEmailExist || isIEmailExist) {
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
        const save = await learners.create(data);

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
      const isLEmailExist = await checkEmailExist(learners, payload?.email);
      const isIEmailExist = await checkEmailExist(instructors, payload?.email);

      if (isLEmailExist || isIEmailExist) {
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
        const save = await instructors.create(data);
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

async function signInUser(payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const isLEmailExist = await checkEmailExist(learners, payload?.email);
      const isIEmailExist = await checkEmailExist(instructors, payload?.email);

      if (!isLEmailExist && !isIEmailExist) {
        return reject({ message: "Email doesn't exist!" });
      } else {
        const decryptPayloadPassword = decryptData(payload.password);
        let data;
        let existPassword;
        if (isLEmailExist) {
          existPassword = isLEmailExist.password;
          data = {
            id: isLEmailExist?.id,
            fullName: isLEmailExist?.firstName + "" + isLEmailExist?.lastName,
            email: isLEmailExist?.email,
            industry: isLEmailExist.industry,
            branch: isLEmailExist?.branch,
            preferredLearning: isLEmailExist?.preferredLearning,
            role: isLEmailExist?.role,
          };
        } else {
          existPassword = isIEmailExist.password;
          data = {
            id: isIEmailExist?.id,
            fullName: isIEmailExist?.firstName + "" + isIEmailExist?.lastName,
            email: isIEmailExist?.email,
            industry: isIEmailExist.industry,
            branch: isIEmailExist?.AEO,
            role: isIEmailExist?.role,
          };
        }
        const decryptExistingPassword = decryptData(existPassword);
        if (decryptExistingPassword === decryptPayloadPassword) {
          const token = await generateToken(data);
          if (token) {
            data.token = token;
          }
          return resolve({ message: "Login success!", data });
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
      const isLEmailExist = await checkEmailExist(learners, payload?.email);
      const isIEmailExist = await checkEmailExist(instructors, payload?.email);

      if (!isLEmailExist && !isIEmailExist) {
        return reject({
          message: "Email doesn't exist! Please check your email and try again",
        });
      } else {
        const recipientFirstName = isLEmailExist
          ? isLEmailExist.firstName
          : isIEmailExist?.firstName;

        const recipientEmail = isLEmailExist
          ? isLEmailExist?.email
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
          <a href="http://localhost:3001/set-new-password?email=${encodeURIComponent(
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

        if (isLEmailExist) {
          mailOptions.to = isLEmailExist?.email;
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
      const isLEmailExist = await checkEmailExist(learners, payload?.email);
      const isIEmailExist = await checkEmailExist(instructors, payload?.email);

      let update;
      if (isLEmailExist) {
        update = await isLEmailExist.update({ password: payload?.newPassword });
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
