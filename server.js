var express = require('express');
var api = require('instagram-node').instagram();
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json())
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

api.use({
    client_id: 'be573c8873f5496caab40ab22f60b895',
    client_secret: '440cc4c661ee4e8baa158dc4b4198e51'
});

var redirect_uri = 'http://localhost:8000/handleauth';

exports.authorize_user = function(req, res) {
    res.redirect(api.get_authorization_url(redirect_uri));
};

exports.handleauth = function(req, res) {
    api.authorize_user(req.query.code, redirect_uri, function(err, result) {
        if (err) {
            console.log(err.body);
            res.send("Didn't work");
        } else {
            console.log('Yay! Access token is ' + result.access_token);
            api.use({
                client_id: 'be573c8873f5496caab40ab22f60b895',
                client_secret: '440cc4c661ee4e8baa158dc4b4198e51',
                access_token: result.access_token
            });
            res.send('You made it!!');
        }
    });
};

//helper functions

var addAdvancedStats = function(fixedHolder){
    var advancedHolder = fixedHolder;
    var advancedFeed = advancedHolder.mediaArray;
    advancedHolder.totalLikeScore = 0;
    advancedHolder.totalCommentScore = 0;
    advancedHolder.totalCombinedScore = 0;

    for(var i=0; i < advancedFeed.length; i++){
        var advancedContext = advancedFeed[i];
        advancedHolder.totalLikeScore += advancedContext.likeScore;
        advancedHolder.totalCommentScore += advancedContext.commentScore;
        advancedHolder.totalCombinedScore += advancedContext.combinedScore;
    }
    advancedHolder.likeScorePerMedia = advancedHolder.totalLikeScore / advancedFeed.length;
    advancedHolder.commentScorePerMedia = advancedHolder.totalCommentScore / advancedFeed.length;
    advancedHolder.combinedScorePerMedia = advancedHolder.totalCombinedScore / advancedFeed.length;

    return advancedHolder;

};
var fixFeed = function(feed){
    var fixedFeed = feed;
    for(var i= 0; i < fixedFeed.length; i++){
        var context = fixedFeed[i];
        if(context.caption) {
            var contextCaption = context.caption;
            contextCaption.text =
                    contextCaption.text.length <= 80 ?
                contextCaption.text : contextCaption.text.substring(0, 79) + ' ...';
            contextCaption.created_time *= 1000;
        }
        context.likeScore = context.likes.count * 2;
        context.commentScore = context.comments.count * 3;
        context.combinedScore = context.likeScore + context.commentScore;
    }
    return fixedFeed;
};

// This is where you would initially send users to authorize
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
app.get('/handleauth', exports.handleauth);


app.get('/user', function(req, res){

    api.user('self', function(err, result, remaining, limit) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

});

app.get('/user_media_recent', function(req, res){
    api.user_media_recent('self', function(err, result, pagination, remaining, limit){
        if (err) {
            res.send(err);
        } else {
            var mediaArrayHolder = {
              mediaArray: result
            };
            mediaArrayHolder.mediaArray = fixFeed(mediaArrayHolder.mediaArray);
            res.send(addAdvancedStats(mediaArrayHolder));
        }
    });
});

app.get('/user_self_feed', function(req, res){
    api.user_self_feed(function(err, feed, pagination, remaining, limit){
        if (err) {
            res.send(err);
        } else {
            res.send(fixFeed(feed));
        }
    });
});

app.listen(8000);