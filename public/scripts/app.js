/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  function createTweetElement(tweet) {
    return $("<article>").addClass('tweet')
      .append($("<header>")
        .append($("<img>").addClass('avatar').attr('src', tweet.user.avatars.small))
        .append($("<div>").addClass("aliases")
          .append($("<h2>").addClass("name").text(tweet.user.name))
          .append($("<p>").addClass("handle").text(tweet.user.handle))
        )
      )
      .append($("<div>").addClass("tweet-body").append($("<p>").text(tweet.content.text)))
      .append($("<footer>")
        .append($("<div>").addClass("timestamp").text(tweet.created_at))
        .append($("<div>").addClass("actions")
          .append($("<a>").attr("href", "#").text(unescape("\uf024")))
          .append($("<a>").attr("href", "#").text("\uf079"))
          .append($("<a>").attr("href", "#").text("\uf004"))
        )
      );
  }

  function setHoverListeners() {
    $('.tweet').on('mouseenter', function() {
      $(this).find('.actions').css('visibility', 'visible');
    });
    $('.tweet').on('mouseleave', function() {
      $(this).find('.actions').css('visibility', 'hidden');
    });
  }

  function renderTweets(tweets) {
    tweets.forEach(function (tweet){
      $(".tweet-list").append(createTweetElement(tweet));
    });
    setHoverListeners();
  }

  function loadTweets() {
    $.getJSON('/tweets', renderTweets);
  }
  loadTweets();

  $("form").on('submit', function(event) {
    event.preventDefault();
    $.post('/tweets', $(this).serialize());
    $("textarea").val("");
  });
});