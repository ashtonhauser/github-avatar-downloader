var request = require('request');
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

  request(url, function(err, response, body) {
    cb(err, body);
  });
}

getRepoContributors('jquery', 'jquery', function (err, result) {
  console.log('Error:', err);
  console.log('Result:', result);
});
