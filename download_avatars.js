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

  request(options, function(err, response, body) {
    cb(err, JSON.parse(body));
  });
}

getRepoContributors('jquery', 'jquery', function (err, result) {
  console.log('Error:', err);
  result.forEach(function (item) {
    console.log(item.avatar_url);
  });
});
