

exports.getWordCountArray = function(body, num) {
    var wordsArray = splitByWords(body);
    var wordsMap = createWordMap(wordsArray);
    var finalWordsArray = sortByCount(wordsMap);
    return finalWordsArray.slice(0,num);
}

var splitByWords = function(text) {
  // split string by spaces (including spaces, tabs, and newlines)
  var wordsArray = text.split(/\s+/);
  return wordsArray;
};

var createWordMap = function(wordsArray) {

    // create map for word counts
    var wordsMap = {};

    wordsArray.forEach(function (key) {
        if (wordsMap.hasOwnProperty(key)) {
            wordsMap[key]++;
        } else {
            wordsMap[key] = 1;
        }
    });
    return wordsMap;
};

var sortByCount = function(wordsMap) {

    // sort by count in descending order
    var finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function (key) {
        return {
            name: key,
            total: wordsMap[key]
        };
    });

    finalWordsArray.sort(function (a, b) {
        return b.total - a.total;
    });

    return finalWordsArray;
};

