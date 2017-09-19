$(document).ready(function() {

  $('.new-tweet').on('input', 'textarea', function(event) {
    const counter = $(this).closest('.new-tweet').find('.counter');
    const remain = 140 - this.value.length;
    counter.text(remain);
    (remain < 0) ? counter.addClass('invalid') : counter.removeClass('invalid');
  });

});