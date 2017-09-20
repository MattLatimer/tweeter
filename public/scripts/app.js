/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function createTweetElement(tweet) {
    const $tweet = $("<article>").addClass('tweet');
    const $tweetHeader = $("<header>");
    const $avatar = $("<img>").addClass('avatar').attr('src', tweet.user.avatars.small);
    const $aliases = $("<div>").addClass("aliases");
    const $name = $("<h2>").addClass("name").text(tweet.user.name);
    const $handle = $("<p>").addClass("handle").text(tweet.user.handle);
    const $tweetBody = $("<div>").addClass("tweet-body").append($("<p>").text(tweet.content.text));
    const $tweetFooter = $("<footer>");
    const $timeStamp = $("<div>").addClass("timestamp").text(tweet.created_at);
    const $actions = $("<div>").addClass("actions");
    const $flag = $("<a>").attr("href", "#").text(unescape("\uf024"));
    const $retweet = $("<a>").attr("href", "#").text("\uf079");
    const $like = $("<a>").attr("href", "#").text("\uf004");

    $actions.append($flag, $retweet, $like);
    $tweetFooter.append($timeStamp, $actions);
    $aliases.append($name, $handle);
    $tweetHeader.append($avatar, $aliases);
    return $tweet.append($tweetHeader, $tweetBody, $tweetFooter);
  }

  function renderTweets(tweets) {
    tweets.forEach(function (tweet){
      $(".tweet-list").append(createTweetElement(tweet));
    });
  }

  renderTweets(data);

  $('.tweet').on('mouseenter', function() {
    $(this).find('.actions').css('visibility', 'visible');
  });
  $('.tweet').on('mouseleave', function() {
    $(this).find('.actions').css('visibility', 'hidden');
  });
});