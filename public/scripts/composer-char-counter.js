// Async character counter for textarea
$(document).ready(function() {
  $('textarea').keyup(function() {
    $(this)
      .parent()
      .children('.counter')
      .html(`${140 - $(this).val().length}`);
    let $tweetLength = $(this).val().length;
    if ($tweetLength > 140) {
      $('span').addClass('negative');
    } else {
      $('span').removeClass('negative');
    }
  });
});
