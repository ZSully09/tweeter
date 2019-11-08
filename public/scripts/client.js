/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

// const tweetData = {
//   user: {
//     name: 'Newton',
//     avatars: 'https://i.imgur.com/73hZDYK.png',
//     handle: '@SirIsaac'
//   },
//   content: {
//     text: 'If I have seen further it is by standing on the shoulders of giants'
//   },
//   created_at: 1461116232227

// const data = [
//   {
//     user: {
//       name: 'Newton',
//       avatars: 'https://i.imgur.com/73hZDYK.png',
//       handle: '@SirIsaac'
//     },
//     content: {
//       text:
//         'If I have seen further it is by standing on the shoulders of giants'
//     },
//     created_at: 1461116232227
//   },
//   {
//     user: {
//       name: 'Descartes',
//       avatars: 'https://i.imgur.com/nlhLi3I.png',
//       handle: '@rd'
//     },
//     content: {
//       text: 'Je pense , donc je suis'
//     },
//     created_at: 1461113959088
//   }
// ];

const renderTweets = function(tweets) {
  const $tweetContainer = $('.tweet-container');
  // loops through tweets
  tweets.forEach(tweet => {
    // calls createTweetElement for each tweet
    // console.log(createTweetElement(tweet));
    const $tweet = createTweetElement(tweet);
    $tweetContainer.append($tweet);
  });
};

const loadtweets = function() {
  $.ajax('/tweets', { method: 'GET' }).then(function(data) {
    console.log('Succuess', data);
    renderTweets(data);
  });
};

/* <article class="tweet">
<header>
  <p class="avatar-name">
    <img src="/images/me.jpg" /> Zach Sullivan
  </p>
  <p class="handle">@ZSully09</p>
</header>
<div class="content">
  BRAAAAP
</div>
<footer>
  <p class="timestamp">10 days ago</p>
  <p class="commands">
    <i class="fa fa-flag-o"></i>
    <i class="fa fa-retweet"></i>
    <i class="fa fa-heart-o"></i>
  </p>
</footer>
</article> */
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
      moment(tweet.created_at)
        .startOf('minute')
        .fromNow()
    );

  const $pCommands = $('<p>')
    .addClass('commands')
    .html(
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

$(document).ready(function() {
  $('form').on('submit', function(e) {
    const tweet = $('textarea').val();
    e.preventDefault();
    // FORM VALIDATION

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
    // console.log(serializedForm);
    // if (tweet.user.content.text === null)
    // $('form').on('submit', function() {
    // });
    // console.log('TEST', tweet);
    // console.log('form b', $(this));
    // console.log('form submitted', tweet);
    $.ajax({
      url: '/tweets',
      method: 'POST',
      dataType: 'json',
      data: serializedForm,
      success: function(data) {
        // console.log(this);
        // console.log(tweet);
        // console.log('data is back :', data);
        $('.tweet-container').prepend(createTweetElement(data));
      },
      error: function(err) {
        console.error('Error :', err);
      }
    });
  });

  loadtweets();
  // renderTweets(data);
});

// $(document).ready(function() {
//   const $tweet = createTweetElement(tweetData);
//   // Test / driver code (temporary)
//   console.log($tweet); // to see what it looks like
//   $('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// });
