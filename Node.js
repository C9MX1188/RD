const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// بيانات الـ OAuth2 الخاصة بك
const CLIENT_ID = '1268813370459688970';
const CLIENT_SECRET = 'eXz2oALGdP580KV4ZnUE74_ny8iBX43X';
const REDIRECT_URI = 'https://rieder.netlify.app/';

// إعداد خادم Express
app.get('/auth/discord', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Authorization code is missing!');
  }

  // استبدال الكود بـ Access Token
  try {
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
        scope: 'identify'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const accessToken = tokenResponse.data.access_token;

    // جلب بيانات المستخدم عبر الـ Access Token
    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const username = userResponse.data.username;
    const avatarHash = userResponse.data.avatar;
    const userId = userResponse.data.id;

    // بناء الرابط للصورة الشخصية
    const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`;

    // إرسال رسالة مع البيانات
    res.send(`
      <h1>مرحبًا ${username}!</h1>
      <p>اسم المستخدم: ${username}</p>
      <p>صورة الملف الشخصي: <img src="${avatarUrl}" alt="Avatar" width="100" height="100" /></p>
    `);

  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).send('Something went wrong.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
