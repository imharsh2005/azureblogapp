const router = require('express').Router();
const e = require('express');
const Article = require('../models/Article');

router.get('/', (req, res, next) => {
    console.log("into get function !!")
    Article.find({}, (err,articles)=>{
        if(err) next(err);
        else res.json(articles);
    });
});

router.get('/seed', (req,res,next)=>{
    console.log('into seed function!!');
    for(let x=0; x<3;x++){
        //var dt = new Date().getFullYear +'-'+new Date().getMonth+'-'+new Date().getDay+' '+new Date().getHours+':'+new Date().getMinutes+':'+new Date().getSeconds;
        const newArticle = new Article({
            article: `This is a default article that is generated on ${new Date()}`,
            dateCreated: new Date(),
        });
        newArticle.save(err => {
            if(err) console.log(err);
            else console.log('Article saved!!!');
        });
    }
    res.send(' Calling the GET function to see if the article are seeded.');
});

router.post('/create', (req, res, next) =>{
    const{ article} = req.body;
    const newArticle = new Article({
        article,
        dateCreated: new Date(),
    });
    newArticle.save(err=>{
        if(err) next(err);
        else res.json({newArticle, msg: 'Article saved sucessfully!!!'});
    });
});

router.delete('/', (res, req, next)=> {
    Article.deleteMany({}, err =>{
        if(err) next(err);
        else res.send('Successfully deleted all articles!!');
    });
});

module.exports = router;
