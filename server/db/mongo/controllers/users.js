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

      const verificationToken = new VerificationToken( {
        email: req.body.email
      } );
      const token = md5.hash( verificationToken.get( 'email' ) + String( verificationToken.get( 'createdAt' ) ) );
      verificationToken.setToken( token );

      let transporter = Nodemailer.createTransport( {
        service: '"Postmark"',
        auth: {
          user: process.env.POSTMARK_API_TOKEN,
          pass: process.env.POSTMARK_API_TOKEN
        }
      } );
      const verificationURL = req.protocol + "://" + req.get( 'host' ) + "/verify/" + token;

      let mailOptions = {
        from: '"Portfolio Rebalancer" <noreply@portfoliorebalancer.com>',
        to: req.body.email,
        subject: 'Verify your Portfolio Rebalancer email address',
        text: 'Thanks for registering for Portfolio Rebalancer. ',
        html: '<p>Thanks for registering for <a href=https://www.portfoliorebalancer.com>PortfolioRebalancer.com</a>! </p>'
            + '<p> Click the following link to verify your email address: <br/>'
            + '<a href=' + verificationURL + '>' + verificationURL + '</a></p>'
            + '<p>This link will expire within 24 hours.</p>' // html body
      };

      transporter.sendMail( mailOptions, (error, info) => {
        if ( error ) {
          return console.log( error );
        }
        console.log( 'Message %s sent: %s', info.messageId, info.response );
      } );

      return req.logIn( user, (loginErr) => {
        if ( loginErr ) {
          return res.status( 409 ).json( {
            response: constants.RESPONSE_LOG_IN_FAILURE,
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

    const passwordResetToken = new PasswordResetToken( {
      email: req.body.email
    } );
    const token = md5.hash( passwordResetToken.get( 'email' ) + String( passwordResetToken.get( 'createdAt' ) ) );
    passwordResetToken.setToken( token );
    const passwordResetURL = req.protocol + "://" + req.get( 'host' ) + "/reset/" + token;

    let transporter = Nodemailer.createTransport( {
      service: '"Postmark"',
      auth: {
        user: process.env.POSTMARK_API_TOKEN,
        pass: process.env.POSTMARK_API_TOKEN
      }
    } );
    let mailOptions = {
      from: '"Portfolio Rebalancer" <noreply@portfoliorebalancer.com>',
      to: req.body.email,
      subject: 'Portfolio Rebalancer password reset',
      text: 'Thanks for registering for Portfolio Rebalancer. ',
      html: '<p>Click the following link to reset your password: <a href=' + passwordResetURL + '>' + passwordResetURL + '</a> </p>'
          + '<p>If you did not request this password reset, ignore this email. The link will expire within 24 hours of being sent.'
    };
    transporter.sendMail( mailOptions, (error, info) => {
      if ( error ) {
        return res.status( 503 ).json( {
          response: constants.RESPONSE_SEND_PASSWORD_RESET_FAILURE
        } );
      }
      console.log( 'Message %s sent: %s', info.messageId, info.response );
    } );

    return res.status( 200 ).json( {
      response: constants.RESPONSE_SEND_PASSWORD_RESET_SUCCESS
    } );
  } );
}

export function sendVerificationEmail( req, res, next ) {
  console.log(req.body.email);
  User.findOne( {
    email: req.body.email
  }, (findErr, existingUser) => {
    if ( findErr || !existingUser ) {
      console.log("NO EMAIL FOUND");
      return res.status( 400 ).json( {
        response: 'No account found for this email address'
      } );
    }

    const passwordResetToken = new PasswordResetToken( {
      email: req.body.email
    } );
    const token = md5.hash( passwordResetToken.get( 'email' ) + String( passwordResetToken.get( 'createdAt' ) ) );
    passwordResetToken.setToken( token );
    const passwordResetURL = req.protocol + "://" + req.get( 'host' ) + "/reset/" + token;

    let transporter = Nodemailer.createTransport( {
      service: '"Postmark"',
      auth: {
        user: process.env.POSTMARK_API_TOKEN,
        pass: process.env.POSTMARK_API_TOKEN
      }
    } );
    let mailOptions = {
      from: '"Portfolio Rebalancer" <noreply@portfoliorebalancer.com>',
      to: req.body.email,
      subject: 'Portfolio Rebalancer password reset',
      text: 'Thanks for registering for Portfolio Rebalancer. ',
      html: '<p>Click the following link to reset your password: <a href=' + passwordResetURL + '>' + passwordResetURL + '</a> </p>'
          + '<p>If you did not request this password reset, ignore this email. The link will expire within 24 hours of being sent.'
    };
    transporter.sendMail( mailOptions, (error, info) => {
      if ( error ) {
        return res.status( 503 ).json( {
          message: 'Error sending password reset email.'
        } );
      }
      console.log( 'Message %s sent: %s', info.messageId, info.response );
    } );

    return res.status( 200 ).json( {
      message: 'Verification email sent to ' + req.body.email
    } );
  } );
}

export default {
  login,
  logout,
  register,
  sendVerificationEmail,
  dbVerify,
  sendPasswordReset
};
