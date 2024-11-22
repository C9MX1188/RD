
// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// إعداد EJS كـ Template Engine
app.set('view engine', 'ejs');

// السماح بخدمة الملفات الثابتة مثل CSS و JS و الصور
app.use(express.static('public'));


// بيانات الـ OAuth2 الخاصة بك
const CLIENT_ID = '1268813370459688970';
const CLIENT_SECRET = 'eXz2oALGdP580KV4ZnUE74_ny8iBX43X';
const REDIRECT_URI = 'https://rieder.netlify.app/test';

// الصفحة الرئيسية (login.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// إعادة توجيه المستخدم إلى Discord OAuth2
app.get('https://rieder.netlify.app/test', (req, res) => {
  const discordAuthURL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;
  res.redirect(discordAuthURL);
});

// معالجة رد Discord بعد تسجيل الدخول
app.get('/auth/discord/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.send('لا يوجد رمز تفويض!');
  }

  try {
    // طلب Access Token
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

    // طلب بيانات المستخدم
    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const userData = userResponse.data;
    const username = userData.username;
    const discriminator = userData.discriminator;
    const avatarHash = userData.avatar;
    const userId = userData.id;

    // بناء رابط الصورة الشخصية
    const avatarURL = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`;

    // عرض صفحة المستخدم مع البيانات
    res.render('user', { username, discriminator, avatarURL, userId });
  } catch (error) {
    console.error('Error fetching access token or user data:', error);
    res.send('حدث خطأ أثناء عملية التسجيل!');
  }
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
