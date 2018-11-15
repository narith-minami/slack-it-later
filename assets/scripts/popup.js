$(function() {

  let requestURL;
  let channel;
  let username;
  let url;
  chrome.tabs.getSelected(null, function(tab) {
      requestURL = localStorage.getItem('request_url');
      channel    = localStorage.getItem('channel');
      username   = localStorage.getItem('username');
      url        = tab.url;
  });

    $('#post-to-share-button').on('click', function(e) {
        postToURLAndCommnet();
    });

    function postToURLAndCommnet() {
          const text       = $('#post-to-slack-comment').val()+' '+ url; //tab.title + ' : ' + tab.url;

          if (!requestURL || requestURL === '') {
            alert('request URLが設定されていません。');
            return;
          }

          $.ajax({
              url: requestURL,
              type: 'post',
              data: 'payload=' + JSON.stringify({
                  "channel": channel,
                  "username": username,
                  "text": text
              }),
              success: function() {
                  console.log('success');
                  $('#post-to-slack-message').show();
              },
              error: function() {
                  console.log('fail');
              }
          });
    }

});
