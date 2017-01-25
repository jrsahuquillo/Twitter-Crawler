const Xray = require("x-ray")

var xray = new Xray()

function twitterCrawler(res, nickname) {
  xray('http://twitter.com/'+ nickname, {
    name: 'h1 a',
    username: 'h2 a',
    image: 'img.ProfileAvatar-image@src',
    biography: '.ProfileHeaderCard > p',
    tweets: '.Grid-cell .ProfileNav-item--tweets .ProfileNav-value',
    following: '.Grid-cell .ProfileNav-item--following .ProfileNav-value',
    followers: ' .Grid-cell .ProfileNav-item--followers .ProfileNav-value'
  })((err,response) => {
      res.status(200).send(response)
      console.log(response)
  })
}

module.exports = {
  twitterCrawler
}
