import passport from 'passport';
import Nodemailer from 'nodemailer';
import md5 from 'spark-md5';
import User from '../models/user';
import VerificationToken from '../models/verificationToken';
import PasswordResetToken from '../models/passwordResetToken';
import * as constants from '../../../constants';

export function login( req, res, next ) {

  passport.authenticate( 'local', (authErr, user, info) => {
    if ( authErr ) {
      return res.status( 401 ).json( {
        response: constants.RESPONSE_LOG_IN_NOT_FOUND
      } );    }
    if ( !user ) {
      return res.status( 401 ).json( {
        response: constants.RESPONSE_LOG_IN_NOT_FOUND
      } );
    }

    return req.logIn( user, (loginErr) => {
      if ( loginErr ) {
        return res.status( 401 ).json( {
          response: constants.RESPONSE_LOG_IN_FAILURE
        } );
      }
      if (! user.verified ) {
        return res.status( 200 ).json( {
          response: constants.RESPONSE_LOG_IN_EMAIL_NOT_VERIFIED,
          email: user.email
        } );
      }
      return res.status( 200 ).json( {
        response: constants.RESPONSE_LOG_IN_SUCCESS,
        email: user.email
      } );
    } );
  } )( req, res, next );
}


export function logout( req, res ) {
  req.logout();
  res.redirect( '/' );
}

export function register( req, res, next ) {
  const user = new User( {
    email: req.body.email,
    password: req.body.password
  } );

  User.findOne( {
    email: req.body.email
  }, (findErr, existingUser) => {
    if ( existingUser ) {
      return res.status( 409 ).json( {
        response: constants.RESPONSE_REGISTER_CONFLICT,
      } );
    }

    return user.save( (saveErr) => {
      if ( saveErr ) {
        return res.status( 409 ).json( {
          response: constants.RESPONSE_REGISTER_FAILURE,
        } );
      }
      const sendEmailSucceeded = sendVerificationEmailInternal(req.body.email);
      return req.logIn( user, (loginErr) => {
        if ( loginErr ) {
          return res.status( 409 ).json( {
            response: constants.RESPONSE_LOG_IN_FAILURE,
          } );
        }
        if (!sendEmailSucceeded) {
          return res.status( 200 ).json( {
            response: constants.RESPONSE_REGISTER_VERIFICATION_EMAIL_NOT_SENT
          } );
        }
        return res.status( 200 ).json( {
          response: constants.RESPONSE_REGISTER_VERIFICATION_EMAIL_SENT
        } );
      } );
    } );
  } );
}

export function dbVerify( req, res ) {
  const token = req.body.token;
  console.log( 'VERIFICATION:', token );

  VerificationToken.findOne( {
    token: token
  }, function ( err, token ) {
    if ( err || !token) {
      return res.status( 401 ).json( {
        response: constants.RESPONSE_VERIFY_INVALID_VERIFICATION_TOKEN
      } );
    }
    User.findOne( {
      email: token.email
    }, function ( err, user ) {
      if ( err || !user) {
        return res.status( 401 ).json( {
          response: constants.RESPONSE_VERIFY_FAILURE
        } );
      }
      user[ "verified" ] = true;
      user.save( function ( err ) {


        return req.logIn( user, (loginErr) => {
          if ( loginErr )
            return res.status( 401 ).json( {
              message: loginErr
            } );
          return res.status( 200 ).json( {
            response: constants.RESPONSE_VERIFY_SUCCESS,
            email: user.email
          } );
        } );

      } );
    } );
  } );
}

export function sendPasswordReset( req, res, next ) {
  User.findOne( {
    email: req.body.email
  }, (findErr, existingUser) => {
    if ( findErr || !existingUser ) {
      return res.status( 400 ).json( {
        response: constants.RESPONSE_SEND_PASSWORD_NOT_FOUND,
      } );
    }

    const verificationToken = new VerificationToken( {
      email: req.body.email
    } );
    const token = md5.hash( verificationToken.get( 'email' ) + String( verificationToken.get( 'createdAt' ) ) );
    verificationToken.setToken( token );
    const verificationURL = req.protocol + "://" + req.get( 'host' ) + "/verify/" + token;

    const sendEmailSucceeded = sendEmail(req.body.email,
    'Portfolio Rebalancer password reset',
    'Thanks for registering for Portfolio Rebalancer.',
    '<p>Click the following link to reset your password: <a href=' + passwordResetURL + '>' + passwordResetURL + '</a> </p>'
        + '<p>If you did not request this password reset, ignore this email. The link will expire within 24 hours of being sent.'
    );

    if (sendEmailSucceeded) {
      return res.status( 200 ).json( {
        response: constants.RESPONSE_SEND_PASSWORD_RESET_SUCCESS
      } );
    }
      return res.status( 409 ).json( {
        response: constants.RESPONSE_SEND_PASSWORD_RESET_FAILURE
      } );

  } );
}

export function sendVerificationEmail( req, res, next ) {
  User.findOne( {
    email: req.body.email
  }, (findErr, existingUser) => {
    if ( findErr || !existingUser ) {
      return res.status( 401 ).json( {
        response: constants.RESPONSE_SEND_VERIFICATION_EMAIL_NOT_FOUND
      } );
    }
    const sendEmailSucceeded = sendVerificationEmailInternal(req.body.email);
    if (!sendEmailSucceeded) {
      return res.status( 401 ).json( {
        response: constants.RESPONSE_SEND_VERIFICATION_EMAIL_FAILURE
      } );
    }
    return res.status( 401 ).json( {
      response: constants.RESPONSE_SEND_VERIFICATION_EMAIL_SUCCESS
    } );
  } );
}

function sendEmail(to, subject, text, html) {
  let transporter = Nodemailer.createTransport( {
    service: 'Postmark',
    auth: {
      user: process.env.POSTMARK_API_TOKEN,
      pass: process.env.POSTMARK_API_TOKEN
    }
  } );
  let mailOptions = {
    from: '"Portfolio Rebalancer" <noreply@portfoliorebalancer.com>',
    to,
    subject,
    text,
    html
  };
  return transporter.sendMail( mailOptions, (error, info) => {
    if ( error ) {
      return false;
    }
    return true;
  } );
}

function sendVerificationEmailInternal(to) {
  const verificationToken = new VerificationToken( {
    email: to
  } );
  const token = md5.hash( verificationToken.get( 'email' ) + String( verificationToken.get( 'createdAt' ) ) );
  verificationToken.setToken( token );
  const verificationURL = req.protocol + "://" + req.get( 'host' ) + "/verify/" + token;
  return sendEmail(to,
  'Verify your Portfolio Rebalancer email address',
  'Thanks for registering for PortfolioRebalancer.com. Click the following link to verify your email address: ' + verificationURL + '. This link will expire within 24 hours.',
  '<p>Thanks for registering for <a href=https://www.portfoliorebalancer.com>PortfolioRebalancer.com</a>! </p>'
      + '<p> Click the following link to verify your email address: <br/>'
      + '<a href=' + verificationURL + '>' + verificationURL + '</a></p>'
      + '<p>This link will expire within 24 hours.</p>'
  );
}

export default {
  login,
  logout,
  register,
  sendVerificationEmail,
  dbVerify,
  sendPasswordReset
};
