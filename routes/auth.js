var express = require('express');
var router = express.Router();
var config = require('./config')
var axios = require('axios')

/* GET home page. */
router.get('/jirengu', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/github', function(req, res, next) {
    const dataStr = (new Date()).valueOf();
    //重定向到认证接口,并配置参数
    //注意这里使用的是node的https模块发起的请求https://github.com/login/oauth/authorize
    const path = `https://github.com/login/oauth/authorize?client_id=${config.client_id}&state=${dataStr}`;
    //转发到授权服务器
    res.redirect(path);
});

router.get('/github/callback', function(req, res, next) {
    const path = `https://github.com/login/oauth/access_token?`
    axios.post(path, {
      client_id: config.client_id,
      client_secret: config.client_secret,
      code: req.query.code,
    })
    .then(response=>{
      const access_token = response.data.split('&')[0].split('=')[1]
      axios.get('https://api.github.com/user', {
        params: {
          access_token,
        }
      })
      .then(response => {
        res.send({ status: 0, data: response.data})
      })
    })
    .catch((error)=>{
      console.log(error);
    });
});

module.exports = router;
