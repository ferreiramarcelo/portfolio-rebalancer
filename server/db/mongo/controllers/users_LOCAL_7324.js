import passport from 'passport';
import Nodemailer from 'nodemailer';
import md5 from 'spark-md5';
import User from '../models/user';
import VerificationToken from '../models/verificationToken';
import PasswordResetToken from '../models/passwordResetToken';
import * as constants from '../../../constants';

export function login(req, res, next) {
  passport.authenticate('local', (authErr, user, info) => {
    if (user.google) {
      return res.status(401).json({
        response: constants.RESPONSE_LOG_IN_FAILURE_IS_GOOGLE
      });
    }
    if (authErr) {
      return res.status(401).json({
        response: constants.RESPONSE_LOG_IN_NOT_FOUND
      });
    }
    if (!user) {
      return res.status(401).json({
        response: constants.RESPONSE_LOG_IN_NOT_FOUND
      });
    }

    return req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.status(401).json({
          response: constants.RESPONSE_LOG_IN_FAILURE
        });
      }
      if (!user.verified) {
        return res.status(200).json({
          response: constants.RESPONSE_LOG_IN_EMAIL_NOT_VERIFIED,
          email: user.email
        });
      }
      return res.status(200).json({
        response: constants.RESPONSE_LOG_IN_SUCCESS,
        email: user.email
      });
    });
  })(req, res, next);
}


export function logout(req, res) {
  req.logout();
  res.redirect('/');
}

export function isEmailAddressAvailable(req, res, next) {
  User.findOne({
    email: req.params.emailaddress
  }, (findErr, existingUser) => {
    if (existingUser) {
      return res.status(409).json({
      });
    }
    return res.status(200).json({
    });
  });
}

export function isPasswordResetTokenValid(req, res, next) {
  PasswordResetToken.findOne({
    token: req.params.token
  }, (findErr, existingToken) => {
    if (findErr) {
      return res.status(401).json({
        response: constants.RESPONSE_IS_PASSWORD_RESET_TOKEN_VALID_FAILURE,
      });
    }
    if (!existingToken) {
      return res.status(401).json({
        response: constants.RESPONSE_IS_PASSWORD_RESET_TOKEN_VALID_NO,
      });
    }
    return res.status(200).json({
      response: constants.RESPONSE_IS_PASSWORD_RESET_TOKEN_VALID_YES,
    });
  });
}

export function register(req, res, next) {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({
    email: req.body.email
  }, (findErr, existingUser) => {
    if (existingUser) {
      return res.status(409).json({
        response: constants.RESPONSE_REGISTER_CONFLICT,
      });
    }

    user.save((saveErr) => {
      if (saveErr) {
        return res.status(409).json({
          response: constants.RESPONSE_REGISTER_FAILURE,
        });
      }
      return req.logIn(user, (loginErr) => {
        if (loginErr) {
          return res.status(409).json({
            response: constants.RESPONSE_LOG_IN_FAILURE,
          });
        }
        return res.status(200).json({
          response: constants.RESPONSE_LOG_IN_SUCCESS
        });
      });
    });
  });
}

export function dbVerify(req, res) {
  const token = req.body.token;
  VerificationToken.findOne({
    token
  }, (err, token) => {
    if (err || !token) {
      return res.status(401).json({
        response: constants.RESPONSE_VERIFY_INVALID_VERIFICATION_TOKEN
      });
    }
    User.findOne({
      email: token.email
    }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          response: constants.RESPONSE_VERIFY_FAILURE
        });
      }
      user.verified = true;
      user.save((err) => {
        return req.logIn(user, (loginErr) => {
          if (loginErr) {
            return res.status(401).json({
              message: loginErr
            });
          }
          return res.status(200).json({
            response: constants.RESPONSE_VERIFY_SUCCESS,
            email: user.email
          });
        });
      });
    });
  });
}

function sendEmail(to, subject, text, html, callback) {
  const transporter = Nodemailer.createTransport({
    service: 'Sparkpost',
    auth: {
      user: process.env.SPARKPOST_SMTP_USERNAME,
      pass: process.env.SPARKPOST_SMTP_PASSWORD
    }
  });

  let sendingDomain = process.env.SPARKPOST_SMTP_USERNAME;
  const prodSendingDomain = process.env.PRODUCTION_SENDING_DOMAIN;
  if (prodSendingDomain) {
    sendingDomain = prodSendingDomain;
  }
  const mailOptions = {
    from: '"Portfolio Rebalancer" <noreply@' + sendingDomain + '>',
    to,
    subject,
    text,
    html
  };
  return transporter.sendMail(mailOptions, (error, info) => {
    if (!error) {
      console.log('Failed to send email to ', to);
      callback(true);
    }/*
    else {
      console.log('Succeeded in sending email to ', to);
      callback(true);
    } */
  });
}

function sendVerificationEmailInternal(req, callback) {
  VerificationToken.findOne({
    email: req.body.email
  }, (findErr, existingToken) => {
    const token = md5.hash(req.body.email + String(Date.now()));
    let verificationToken = null;
    if (findErr || !existingToken) {
      verificationToken = new VerificationToken({
        email: req.body.email
      });
    } else {
      verificationToken = existingToken;
      existingToken.createdAt = Date.now();
    }
    verificationToken.setToken(token);
    const verificationURL = req.protocol + '://' + req.get('host') + '/verify/' + token;
    sendEmail(req.body.email,
      'Verify your Portfolio Rebalancer email address',
      'Thanks for using PortfolioRebalancer.com. Click the following link to verify your email address: ' + verificationURL + '. This link will expire within 24 hours.',
      '<p>Thanks for using <a href=https://www.portfoliorebalancer.com>PortfolioRebalancer.com</a>.</p>'
        + '<p>Click the following link to verify your email address: <a href=' + verificationURL + '>' + verificationURL + '</a><br/>'
        + '<p>This link will expire within 24 hours.</p>',
      (emailSentSuccessfully) => {
        callback(emailSentSuccessfully);
      });
  });
}

export function sendVerificationEmail(req, res, next) {
  User.findOne({
    email: req.body.email
  }, (findErr, existingUser) => {
    if (findErr || !existingUser) {
      return res.status(401).json({
        response: constants.RESPONSE_SEND_VERIFICATION_EMAIL_NOT_FOUND
      });
    }

    sendVerificationEmailInternal(req, (emailSentSuccessfully) => {
      if (!emailSentSuccessfully) {
        return res.status(401).json({
          response: constants.RESPONSE_SEND_VERIFICATION_EMAIL_FAILURE
        });
      }
      else {
        return res.status(200).json({
          response: constants.RESPONSE_SEND_VERIFICATION_EMAIL_SUCCESS
        });
      }
    });
  });
}

export function sendPasswordReset(req, res, next) {
  User.findOne({
    email: req.body.email
  }, (findErr, existingUser) => {
    if (findErr || !existingUser) {
      return res.status(400).json({
        response: constants.RESPONSE_SEND_PASSWORD_RESET_NOT_FOUND,
      });
    }
    if (existingUser.google) {
      return res.status(400).json({
        response: constants.RESPONSE_SEND_PASSWORD_RESET_IS_GOOGLE,
      });
    }
    const token = md5.hash(req.body.email + String(Date.now()));
    const passwordResetToken = new PasswordResetToken({
      email: req.body.email
    });
    passwordResetToken.setToken(token);
    const passwordResetURL = req.protocol + '://' + req.get('host') + '/reset/' + token;

    sendEmail(req.body.email,
      'Portfolio Rebalancer password reset',
      'Click the following link to reset your password: ' + passwordResetURL + '.'
        + ' If you did not request this password reset, you can safely ignore this email. The link will expire within 24 hours of being sent.',
      '<p>Click the following link to reset your password: <a href=' + passwordResetURL + '>' + passwordResetURL + '</a> </p>'
        + '<p>If you did not request this password reset, you can safely ignore this email. The link will expire within 24 hours of being sent.',
      (emailSentSuccessfully) => {
        if (!emailSentSuccessfully) {
          return res.status(409).json({
            response: constants.RESPONSE_SEND_PASSWORD_RESET_FAILURE
          });
        }
        return res.status(200).json({
          response: constants.RESPONSE_SEND_PASSWORD_RESET_SUCCESS
        });
      }
    );
  });
}

export function changePassword(req, res) {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        response: constants.RESPONSE_PASSWORD_USER_NOT_FOUND
      });
    }
    user.comparePassword(req.body.currentPassword, (err, isMatch) => {
      if (err) {
        return res.status(401).json({
          response: constants.RESPONSE_PASSWORD_RESET_FAILURE
        });
      }
      if (!isMatch) {
        return res.status(401).json({
          response: constants.RESPONSE_PASSWORD_RESET_INVALID_PASSWORD
        });
      }

      user.password = req.body.newPassword;
      user.save((err) => {
        if (err) {
          return res.status(401).json({
            response: constants.RESPONSE_PASSWORD_RESET_FAILURE
          });
        }

        return req.logIn(user, (loginErr) => {
          if (loginErr) {
            return res.status(409).json({
              response: constants.RESPONSE_PASSWORD_RESET_FAILURE,
            });
          }
          return res.status(200).json({
            response: constants.RESPONSE_PASSWORD_RESET_SUCCESS
          });
        });
      });
    });
  });
}

export function changePasswordWithToken(req, res) {
  PasswordResetToken.findOne({
    token: req.body.token
  }, (err, existingToken) => {
    if (err || !existingToken) {
      return res.status(401).json({
        response: constants.RESPONSE_PASSWORD_INVALID_TOKEN
      });
    }

    User.findOne({
      email: existingToken.email
    }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          response: constants.RESPONSE_PASSWORD_USER_NOT_FOUND
        });
      }

      user.password = req.body.newPassword;
      user.save((err) => {
        if (err) {
          return res.status(401).json({
            response: constants.RESPONSE_PASSWORD_RESET_FAILURE
          });
        }
        existingToken.remove();
        return res.status(200).json({
          response: constants.RESPONSE_PASSWORD_RESET_SUCCESS
        });
      });
    });
  });
}

export default {
  login,
  logout,
  isEmailAddressAvailable,
  isPasswordResetTokenValid,
  register,
  sendVerificationEmail,
  dbVerify,
  sendPasswordReset,
  changePassword,
  changePasswordWithToken
};
