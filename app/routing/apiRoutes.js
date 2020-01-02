const friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
      res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    let userData = req.body

    let newFriend = {
      name: userData.name,
      photo: userData.photo,
      scores: []
    }

    for (let i = 0; i < userData.scores.length; i++) {
      newFriend.scores.push(userData.scores[i]);
    }

    let checkArray = [];
    
    for (let i = 0; i < friendsData.length; i++) {
      let totalDifference = 0;
      for (let j = 0; j < newFriend.scores.length; j++) {
          totalDifference += Math.abs(parseInt(newFriend.scores[j]) - parseInt(friendsData[i].scores[j]));
      }
      checkArray.push(totalDifference);
    }

    let index = 0;
  
    for (let i = 0; i < checkArray.length; i++) {
      if (checkArray[i] <= checkArray[index]) {
          index = i;
      }
    }

    let bestMatch = friendsData[index];
    res.json(bestMatch);

    friendsData.push(newFriend);
  });
}