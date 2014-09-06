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

var redirect_uri = 'http://localhost:8000/handleauth';
var access_token;

exports.authorize_user = function(req, res) {
    api.use({
        client_id: 'be573c8873f5496caab40ab22f60b895',
        client_secret: '440cc4c661ee4e8baa158dc4b4198e51'
    });
    res.redirect(api.get_authorization_url(redirect_uri));
};

exports.handleauth = function(req, res) {
    api.authorize_user(req.query.code, redirect_uri, function(err, result) {
        if (err) {
            console.log(err.body);
            res.send("Didn't work");
        } else {
            access_token = result.access_token;
            api.use({
                client_id: 'be573c8873f5496caab40ab22f60b895',
                client_secret: '440cc4c661ee4e8baa158dc4b4198e51'
            });
            res.redirect('http://localhost:9000/#/dashboard');
        }
    });
};

//helper functions
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
        context.likeScore = context.likes.count;
        context.commentScore = context.comments.count;
        context.combinedScore = context.likeScore + context.commentScore;
    }
    return fixedFeed;
};

var addAdvancedStats = function(fixedHolder){
    var advancedHolder = fixedHolder;
    var advancedFeed = fixFeed(advancedHolder.mediaArray);
    advancedHolder.stats= {
        totalLikeScore : {name: 'Total Likes', value: 0},
        totalCommentScore : {name: 'Total Comments', value: 0},
        totalCombinedScore : {name: 'Total Combined', value: 0},
        likeScorePerMedia : {name: 'Likes per Media', value: 0},
        commentScorePerMedia : {name: 'Comments per Media', value: 0},
        combinedScorePerMedia : {name: 'Combined per Media', value: 0},
        filterStats : {}
    };
    var statsContext = advancedHolder.stats;
    var filterStatsContext = statsContext.filterStats;

    for(var i=0; i < advancedFeed.length; i++){
        var advancedContext = advancedFeed[i];
        statsContext.totalLikeScore.value += advancedContext.likeScore;
        statsContext.totalCommentScore.value += advancedContext.commentScore;
        statsContext.totalCombinedScore.value += advancedContext.combinedScore;
        if (advancedContext.hasOwnProperty('filter')) {
            var contextFilter = advancedContext.filter;
            if (filterStatsContext.hasOwnProperty(contextFilter)) {
                filterStatsContext[contextFilter].timesUsed++;
                filterStatsContext[contextFilter].totalLikeScoreForFilter += advancedContext.likeScore;
                filterStatsContext[contextFilter].totalCommentScoreForFilter += advancedContext.commentScore;
                filterStatsContext[contextFilter].totalCombinedScoreForFilter += advancedContext.combinedScore;
                filterStatsContext[contextFilter].likeScorePerTimesUsed = filterStatsContext[contextFilter].totalLikeScoreForFilter / filterStatsContext[contextFilter].timesUsed;
                filterStatsContext[contextFilter].commentScorePerTimesUsed = filterStatsContext[contextFilter].totalCommentScoreForFilter / filterStatsContext[contextFilter].timesUsed;
                filterStatsContext[contextFilter].combinedScorePerTimesUsed = filterStatsContext[contextFilter].totalCombinedScoreForFilter / filterStatsContext[contextFilter].timesUsed;
            } else {
                filterStatsContext[contextFilter] = {
                    timesUsed: 1,
                    totalLikeScoreForFilter: advancedContext.likeScore,
                    totalCommentScoreForFilter: advancedContext.commentScore,
                    totalCombinedScoreForFilter: advancedContext.combinedScore,
                    likeScorePerTimesUsed: advancedContext.likeScore,
                    commentScorePerTimesUsed: advancedContext.commentScore,
                    combinedScorePerTimesUsed: advancedContext.combinedScore
                };
            }
        }
    }

    statsContext.likeScorePerMedia.value = statsContext.totalLikeScore.value / advancedFeed.length;
    statsContext.commentScorePerMedia.value = statsContext.totalCommentScore.value / advancedFeed.length;
    statsContext.combinedScorePerMedia.value = statsContext.totalCombinedScore.value / advancedFeed.length;

    return advancedHolder;

};


// This is where you would initially send users to authorize
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
app.get('/handleauth', exports.handleauth);


app.get('/user', function(req, res){
    api.use({access_token: access_token});
    var userId = req.query.user_id;
    api.user(userId, function(err, result, remaining, limit) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

});

app.get('/user_media_recent', function(req, res){
    api.use({access_token: access_token});
    var userId = req.query.user_id;
    api.user_media_recent(userId, function(err, result, pagination, remaining, limit){
        if (err) {
            res.send(err);
        } else {
            var mediaArrayHolder = {
              mediaArray: result
            };
            //mediaArrayHolder.mediaArray = fixFeed(mediaArrayHolder.mediaArray);
            res.send(addAdvancedStats(mediaArrayHolder));
        }
    });
});

app.get('/user_self_feed', function(req, res){
    api.use({access_token: access_token});
    api.user_self_feed(function(err, feed, pagination, remaining, limit){
        if (err) {
            res.send(err);
        } else {
            res.send(fixFeed(feed));
        }
    });
});

app.listen(8000);