var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) { 
        res.json(friends);
    });


    app.post("/api/friends", function(req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        }

        var userData = req.body;
        var userName = userData.name;
        var userPhoto = userData.photo;
        var userScore = userData.score;

        var scoreDifference = 0;

        for (var i = 0; i < friends.length; i++) { 

            scoreDifference = 0;

            for (var j = 0; j < userData.length; j++) {
                
                scoreDifference += Math.abs(friends[i].score[j] - userScore[j]);
            
                if (scoreDifference <= bestMatch.friendDifference) { 

                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo; 
                    bestMatch.friendDifference = scoreDifference;
                }
            }
        };

        friends.push(userData);

        res.json(bestMatch);

    });

};