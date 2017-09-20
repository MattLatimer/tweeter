/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  $('.tweet').on('mouseenter', function() {
    $(this).find('.actions').css('visibility', 'visible');
  });
  $('.tweet').on('mouseleave', function() {
    $(this).find('.actions').css('visibility', 'hidden');
  });
});