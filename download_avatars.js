var request = require('request');
var fs = require('fs');
var tokens = require('./secrets');


console.log('Welcome to Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner +  '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + tokens.GITHUB_TKN
    }
  };

  request(options, function(err, response, body) {
    cb(err, JSON.parse(body));
  });
}

function downloadImageByURL(url, filePath) {
  request(url, function(err, result, body) {
    fs.writeFile(filePath, body, function(err, body) {
      if (err) console.log(err);
    });
  });
}

getRepoContributors(process.argv[2], process.argv[3], function (err, result) {
  if (process.argv[2]||process.argv[3] === false) { throw new Error('You must put repo owner and name seperated by a space as command line inputs.'); }
  if (err === true) { console.log('Error:', err); }
  result.forEach(function (item) {
    downloadImageByURL(item.avatar_url, './avatars/' + item.login + '.jpg');
  });
});
