/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';
export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '319371613561-3u1prbufneej1q6hasq9gqp3gsujaeqq.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || 'qdl9MJKBRNVBzSWZimOvzo71',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

export default {
  sessionSecret,
  google
};
