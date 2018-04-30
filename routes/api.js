var express = require('express');
var router = express.Router();
var Note = require('../model/node')

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  var opts = {raw: true}
  if(req.session && req.session.user){
    opts.where = {uid:req.session.user.id }
  }

  Note.findAll(opts).then(function(notes) {
    console.log(notes)
    res.send({status: 0, data: notes});
  }).catch(function(){
    res.send({ status: 1,errorMsg: '数据库异常'});
  });
});

// 添加
router.post('/notes/add', (req, res, next)=> {
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  const uid = req.session.user.id
  const note = req.body.note
  Note.create({ text: note, uid }).then(()=>{
    res.send({ status: 0 })
  }).catch(()=>{
    res.send({ status: 1, msg: '数据库出错' })
  })
}) 

// 编辑
router.post('/notes/edit', (req, res, next)=>{
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  const uid = req.session.user.id
  const { id, note } = req.body
  Note.update({ text: note }, { where: { id, uid } }).then(()=>{
    res.send({ status: 0 })
  }).catch(()=>{
    res.send({ status: 1, msg: '数据库出错' })
  })
})

// 删除

router.post('/notes/delete', (req, res, next)=>{
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  const { id } = req.body
  const uid = req.session.user.id
  Note.destroy({ where: { id, uid } }).then(()=>{
    res.send({ status: 0 })
  })
  .catch(()=>{
    res.send({ status: 1, msg: '数据库出错' })
  })
})
module.exports = router;
