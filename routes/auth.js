var express = require('express');
var router = express.Router();
var config = require('./config')
var axios = require('axios')
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;


passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  // User.findById(id, function (err, user) {
  //   done(err, user);
  // });
  console.log(id)
  done(null, id);
});

passport.use(new GitHubStrategy({
    clientID: config.client_id,
    clientSecret: config.client_secret,
    callbackURL: "http://192.168.1.102:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    cb(null, profile);
  }
));

/* GET home page. */
router.get('/jirengu', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/github',
  passport.authenticate('github'));
 
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });

// router.get('/github', function(req, res, next) {
//     const dataStr = (new Date()).valueOf();
//     //重定向到认证接口,并配置参数
//     //注意这里使用的是node的https模块发起的请求https://github.com/login/oauth/authorize
//     const path = `https://github.com/login/oauth/authorize?client_id=${config.client_id}&state=${dataStr}`;
//     //转发到授权服务器
//     res.redirect(path);
// });

// router.get('/github/callback', function(req, res, next) {
//     const path = `https://github.com/login/oauth/access_token?`
//     axios.post(path, {
//       client_id: config.client_id,
//       client_secret: config.client_secret,
//       code: req.query.code,
//     })
//     .then(response=>{
//       const access_token = response.data.split('&')[0].split('=')[1]
//       axios.get('https://api.github.com/user', {
//         params: {
//           access_token,
//         }
//       })
//       .then(response => {
//         res.send({ status: 0, data: response.data})
//       })
//     })
//     .catch((error)=>{
//       console.log(error);
//     });
// });

router.get('/logout', (req, res, next)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
