/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Global Setup
//-------------

moment().format();

// Global Variables
//-----------------

const charLimit = 140;

$(function() {

// Loading Tweets from Data
//-------------------------

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
        .append($("<div>").addClass("timestamp").text(moment(tweet.created_at).fromNow()))
        .append($("<div>").addClass("actions")
          .append($("<a>").attr("href", "#").text("\uf024"))
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
      $(".tweet-list").prepend(createTweetElement(tweet));
    });
    setHoverListeners();
  }

  function loadTweets() {
    $.getJSON('/tweets', renderTweets);
  }
  loadTweets();


  // Compose Button
  //---------------
  $(".compose").on('click', function() {
    $(".new-tweet").slideToggle(null, function(event) {
      $("textarea").focus();
    });
  });

  // Submitting New Tweet
  //---------------------
  $("form").on('submit', function(event) {
    event.preventDefault();
    const message = $(this).serialize();
    if (message.length <= 5) {
      $(".error").text("Tweet can't be empty.");
    } else if (message.length > charLimit + 5) {
      $(".error").text("Tweet is too long.");
    } else {
      $(".error").text("");
      $("textarea").val("");
      $(".counter").text(charLimit);
      $.post("/tweets", message, function() {
        $("tweet-list").empty();
        loadTweets();
      });
    }
  });
});