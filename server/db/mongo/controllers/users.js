import passport from 'passport';
import User from '../models/user';
import Nodemailer from 'nodemailer';
/**
 * POST /login
 */
export function login( req, res, next ) {
  // Do email and password validation for the server
  passport.authenticate( 'local', (authErr, user, info) => {
    if ( authErr )
      return next( authErr );
    if ( !user ) {
      return res.status( 401 ).json( {
        message: info.message
      } );
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
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

/**
 * POST /logout
 */
export function logout( req, res ) {
  // Do email and password validation for the server
  req.logout();
  res.redirect( '/' );
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp( req, res, next ) {
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

      // Send confirmation email
      // create reusable transporter object using the default SMTP transport
      let transporter = Nodemailer.createTransport( {
        service: '"Postmark"',
        auth: {
          user: process.env.POSTMARK_API_TOKEN,
          pass: process.env.POSTMARK_API_TOKEN
        }
      } );

      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Portfolio Rebalancer" <noreply@portfoliorebalancer.com>', // sender address
        to: 'descalexis@gmail.com, alexisdeschampsqc@gmail.com', // list of receivers
        subject: 'Confirm your Portfolio Rebalancer email', // Subject line
        text: 'Thanks for registering for Portfolio Rebalancer. ', // plain text body
        html: '<p>Thanks for registering for PortfolioRebalancer.com! Click the following link to confirm your email: www.dummylink.com.</p>' // html body
      };

      // send mail with defined transport object
      transporter.sendMail( mailOptions, (error, info) => {
        if ( error ) {
          return console.log( error );
        }
        console.log( 'Message %s sent: %s', info.messageId, info.response );
      } );

      if ( saveErr )
        return next( saveErr );
      return req.logIn( user, (loginErr) => {
        if ( loginErr )
          return res.status( 401 ).json( {
            message: loginErr
          } );
        return res.status( 200 ).json( {
          message: 'You have been successfully logged in.'
        } );
      } );
    } );
  } );
}

export default {
  login,
  logout,
  signUp
};
