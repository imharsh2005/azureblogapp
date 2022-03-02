const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    article: String,
    dateCreated: Date,
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports=Article;
