module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '5d', 
      },
      policies: {
        isAuthenticated: 'global::isAuthenticated',
      },
    },
  },
  
  email: {
    config: {
      provider: 'strapi-provider-email-smtp',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: env('EMAIL_USER'),
          pass: env('EMAIL_PASS'),
        },
      },
      settings: {
        defaultFrom: 'no-reply@strapi.io',
        defaultReplyTo: 'no-reply@strapi.io',
      },
    },
  },
});
