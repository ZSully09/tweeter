const renderTweets = function(tweets) {
  const $tweetContainer = $('.tweet-container').empty();
  // Show tweets in reverse chronological order
  tweets.sort((a, b) => {
    if (a.created_at > b.created_at) return -1;
    if (a.created_at < b.created_at) return 1;
    return 0;
  });
  // Append each tweet to the tweet container
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.append($tweet);
  });
};

const loadtweets = function() {
  $.ajax('/tweets', { method: 'GET' }).then(function(data) {
    renderTweets(data);
  });
};

// Individual tweet creation
const createTweetElement = function(tweet) {
  const $img = $('<img>').attr('src', tweet.user.avatars);

  const $pAvatarName = $('<p>')
    .addClass('avatar-name')
    .text(tweet.user.name)
    .append($img);

  const $pHandle = $('<p>')
    .addClass('handle')
    .text(tweet.user.handle);

  const $contentDiv = $('<div>')
    .addClass('content')
    .text(tweet.content.text);

  const $timestamp = $('<p>')
    .addClass('timestamp')
    .text(
      // 'Time ago' feature
      moment(tweet.created_at)
        .startOf('minute')
        .fromNow()
    );

  const $pCommands = $('<p>')
    .addClass('commands')
    .html(
      // Command icons
      '<i class="fa fa-flag-o"></i> <i class="fa fa-retweet"></i> <i class="fa fa-heart-o"></i>'
    );

  const $header = $('<header>')
    .append($pAvatarName)
    .append($pHandle);

  const $footer = $('<footer>')
    .append($timestamp)
    .append($pCommands);

  const $article = $('<article>').addClass('tweet');

  return $article
    .append($header)
    .append($contentDiv)
    .append($footer);
};

// Async features
$(document).ready(function() {
  $('form').on('submit', function(e) {
    const tweet = $('textarea').val();
    e.preventDefault();
    // Form validation
    if (tweet.length === 0) {
      return $('div.error')
        .text('!!! Please input a valid tweet !!!')
        .slideDown();
    } else if (tweet.length > 140) {
      return $('div.error')
        .text('!!! You have exceeded the character limit !!!')
        .slideDown();
    }
    const serializedForm = $(this).serialize();
    $('div.error')
      .text('')
      .slideUp();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      dataType: 'json',
      data: serializedForm,
      success: function(data) {
        // Upon successful form submission (tweet) prepend the tweet, clear the text area, and reset the counter
        $('.tweet-container').prepend(createTweetElement(data));
        $('textarea').val('');
        $('.counter').text('140');
      },
      error: function(err) {
        console.error('Error :', err);
      }
    });
  });

  loadtweets();
});
