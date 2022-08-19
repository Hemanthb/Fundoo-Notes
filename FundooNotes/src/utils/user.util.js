const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '257927953850-mb8oag6eg2fg3kuo705u48r3isui789u.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04PKlBvaJAM-nCgYIARAAGAQSNwF-L9Ir3NTQtkxMkBFNpAZS925LXW40DAQk0UKb8hk10bJq7OCZUqd2fEGHjrpD3vvP0AUI3sM';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  export async function sendMail(email,token) {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'hemanth.b@bridgelabz.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'Hemanth <hemanth.b@bridgelabz.com>',
        to: email,
        subject: 'Hello from gmail using API',
        text: 'Hello from gmail email using API',
        html: `<h1>To reset your password<a href="http://localhost:3000/api/v1/users/resetPwd/${token}">click here</a></h1>`,
      };
  
      const result = await transport.sendMail(mailOptions);
      //return result;
      return token;
    } catch (error) {
      return error;
    }
  }

  export async function registerMail(email) {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'hemanth.b@bridgelabz.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'Hemanth <hemanth.b@bridgelabz.com>',
        to: email,
        subject: 'Hi ! User registration',
        text: 'Hello!! Your new acct created',
        html: `<h1>Account registered Successfully!!!</h1>`,
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
      
    } catch (error) {
      return error;
    }
  }
  
  /* sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));   */