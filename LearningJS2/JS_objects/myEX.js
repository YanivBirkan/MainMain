// var studentNames = ["aa" , "bb" , "cc"];
// var studentGrades = [90 , 80 , 100];
/// <reference lib="es2015" />
var gNextId = 101;
function createPlayer(name) {
    var newPlayer = {
        id: gNextId++,
        score: Math.floor(Math.random() * 100),
        name: name,
    };
    return newPlayer;
}
function createPlayers(count) {
    var players = [];
    for (var i = 0; i < count; i++) {
        var name_1 = "player".concat(i + 1);
        players.push(createPlayer(name_1));
    }
    return players;
}
function getPlayerById(playersArr, gid) {
    var found = playersArr.find(function (_a) {
        var id = _a.id;
        return id === gid;
    });
    return found;
}
function findBestPlayer(playersArr) {
    var scores = [];
    var max = 0;
    for (var i = 0; i < playersArr.length; i++) {
        var player = playersArr[i];
        scores.push(player.score);
    }
    for (var i = 0; i < scores.length; i++) {
        if (scores[i] > max)
            max = scores[i];
    }
    // FIXED: Added explicit type annotation for the parameter
    var best = playersArr.find(function (p) { return p.score === max; });
    return best;
}
// Alternative syntax (also works):
function findBestPlayerAlternative(playersArr) {
    var scores = [];
    var max = 0;
    for (var i = 0; i < playersArr.length; i++) {
        var player = playersArr[i];
        scores.push(player.score);
    }
    for (var i = 0; i < scores.length; i++) {
        if (scores[i] > max)
            max = scores[i];
    }
    // TypeScript can infer the type from playersArr: Player[]
    var best = playersArr.find(function (p) { return p.score === max; });
    return best;
}
