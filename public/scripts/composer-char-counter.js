$(document).ready(function() {
  // --- our code goes here ---
  $('textarea').keyup(function() {
    $(this)
      .parent()
      .children('.counter')
      .html(`${140 - $(this).val().length}`);
    // console.log(140 - $(this).val().length);
    // console.log('testing 123');
    // console.log(this.textarea.length);
    // console.log(message.length);
    // console.log(this);
    let $tweetLength = $(this).val().length;
    if ($tweetLength > 140) {
      $('span').addClass('negative');
    } else {
      $('span').removeClass('negative');
    }
  });
});
