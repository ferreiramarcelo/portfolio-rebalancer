import passport from 'passport';
import Nodemailer from 'nodemailer';
import md5 from 'spark-md5';
import User from '../models/user';
import VerificationToken from '../models/verificationToken';

export function login( req, res, next ) {

  passport.authenticate( 'local', (authErr, user, info) => {
    if ( authErr ) {
      return next( authErr );
    }
    if ( !user ) {
      return res.status( 401 ).json( {
        message: info.message
      } );
    }

    return req.logIn( user, (loginErr) => {
      if ( loginErr )
        return res.status( 401 ).json( {
          message: loginErr
        } );
      return res.status( 200 ).json( {
        message: 'You have been successfully logged in.'
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
        message: 'Account with this email address already exists!'
      } );
    }

    return user.save( (saveErr) => {
      if ( saveErr ) {
        return next( saveErr );
      }

      const verificationToken = new VerificationToken( {
        email: req.body.email
      } );
      const token = md5.hash( verificationToken.get( 'email' ) + String( verificationToken.get( 'createdAt' ) ) );
      verificationToken.setToken( token );
      // Send confirmation email
      // create reusable transporter object using the default SMTP transport
      let transporter = Nodemailer.createTransport( {
        service: '"Postmark"',
        auth: {
          user: process.env.POSTMARK_API_TOKEN,
          pass: process.env.POSTMARK_API_TOKEN
        }
      } );
      const verificationURL = req.protocol + "://" + req.get( 'host' ) + "/verify/" + token;
      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Portfolio Rebalancer" <noreply@portfoliorebalancer.com>',
        to: 'descalexis@gmail.com, alexisdeschampsqc@gmail.com',
        subject: 'Verify your Portfolio Rebalancer email address',
        text: 'Thanks for registering for Portfolio Rebalancer. ',
        html: '<p>Thanks for registering for <a href=https://www.portfoliorebalancer.com>PortfolioRebalancer.com</a>! </p>'
            + '<p> Click the following link to verify your email address: <br/>'
            + '<a href=' + verificationURL + '>' + verificationURL + '</a></p>'
            + '<p>This link will expire within 24 hours.</p>' // html body
      };
      // send mail with defined transport object
      transporter.sendMail( mailOptions, (error, info) => {
        if ( error ) {
          return console.log( error );
        }
        console.log( 'Message %s sent: %s', info.messageId, info.response );
      } );

      return req.logIn( user, (loginErr) => {
        if ( loginErr ) {
          return res.status( 401 ).json( {
            message: loginErr
          } );
        }
        return res.status( 200 ).json( {
          message: 'You have been successfully logged in.'
        } );
      } );
    } );
  } );
}

export function sendverify( req, res ) {
  const token = req.body.token;
  console.log( 'VERIFICATION:', token );

  VerificationToken.findOne( {
    token: token
  }, function ( err, token ) {
    if ( err || !token) {
      return res.status( 401 ).json( {
        message: 'Invalid verification token. RESEND VERICIATION EMAIL'
      } );
    }
    User.findOne( {
      email: token.email
    }, function ( err, user ) {
      if ( err || !user) {
        return res.status( 401 ).json( {
          message: 'Email could not be verified. RESEND VERICIATION EMAIL'
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
            message: 'Email successfully verified.',
            email: user.email
          } );
        } );

      } );
    } );
  } );
}

export default {
  login,
  logout,
  register,
  sendverify
};
