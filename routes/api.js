var express = require('express');
var router = express.Router();
var Note = require('../model/node')

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  Note.findAll({ raw: true }).then(notes=>{
    res.send({ status:0, data: notes })
  })
});

// 添加
router.post('/notes/add', (req, res, next)=> {
  const note = req.body.note
  Note.create({ text: note }).then(()=>{
    res.send({ status: 0 })
  }).catch(()=>{
    res.send({ status: 1, msg: '数据库出错' })
  })
}) 

// 编辑
router.post('/notes/edit', (req, res, next)=>{
  const { id, note } = req.body
  Note.update({ text: note }, { where: { id } }).then(()=>{
    res.send({ status: 0 })
  }).catch(()=>{
    res.send({ status: 1, msg: '数据库出错' })
  })
})

// 删除

router.post('/notes/delete', (req, res, next)=>{
  const { id } = req.body
  Note.destroy({ where: { id } }).then(()=>{
    res.send({ status: 0 })
  })
  .catch(()=>{
    res.send({ status: 1, msg: '数据库出错' })
  })
})
module.exports = router;
