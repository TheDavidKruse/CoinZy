var express = require('express');

var router = express.Router();
var knex = require('../db/knex');


router.get('/user',function(req,res){
  knex('users')
  .select()
  .where('username','=',req.body.username)
  .then(function(user){
    if(req.body.password === user.password){
      res.send({
        id:user.id,
        username:user.username
      })
    }else{
      res.send({
        id:false,
        username:false
      })
    }
  })
})


router.get('/messages', function(req, res){
    knex('messages')
  .rightJoin('users','user_id','=','users.id')
  .then(function(messages){
res.send(messages)
  })
});

router.post('/user', function(req,res){
knex('users')
.insert(req.body)
.then(function(result){
console.log(result)
})

})

router.post('/messages',function(req,res){
  knex('messages')
  .insert({
    message:req.body.message,
    user_id:req.body.user_id
  })
})




module.exports = router;
