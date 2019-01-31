import client from '@/config/client';
var qs = require('qs');

class UserProvider {
  authorize(credential) {
    const data = {
      grant_type: 'password',
      username: credential.username,
      password: credential.password,
      client_id: process.env.VUE_APP_API_CLIENT_ID || 'forfeaterWeb',
      client_secret: process.env.VUE_APP_API_CLIENT_SECRET || 'forfeaterSecret'
    };
    return client.post('/auth/login', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  provide(access_token) {
    return client.get('auth/user', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
  }
}

export default new UserProvider();
