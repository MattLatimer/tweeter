$(function() {

  const charLimit = 140;

  $('.new-tweet').on('input', 'textarea', function(event) {
    const counter = $(this).siblings('.counter');
    const remain = charLimit - this.value.length;
    counter.text(remain);
    counter.toggleClass('invalid', remain < 0);
  });

});