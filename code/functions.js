// Variables and constructs
  const clientId = '{Your Client ID here}'; // Only need to edit if you are doing your own Twitch app registry

  // URLs to use
  const defaultAvatarUrl = '{Your default Image URL here}';

  // I wouldn't touch this unless you know what you are doing
  const endpoint = channelName => `https://api.twitch.tv/helix/users?login=${channelName}`;

  // Saved information
  var accessToken = '{Your OAuth token here}'; // Only change if you need a new token
  const cache = {};

document.addEventListener('onLoad', function(obj) {
  // obj will be empty for chat widget
  // this will fire only once when the widget loads
});

document.addEventListener('onEventReceived', function(obj) {
  if (!obj || typeof obj.detail === 'undefined' || obj.detail === null) {
    return;
  }

  // Display in the console log (Chrome - Right click anywhere > Inspect > Console)
  const { from: username, messageId, tags } = obj.detail;
  const displayName = tags['display-name'] || null;
  console.log(displayName, '<-');
  if (!username) {
    return;
  }

  // Caches the Twitch user to be used somewhere else eventually
  if (typeof cache[username] !== 'undefined') {
    const elems = displayName !== null ? document.getElementsByClassName(`message-${displayName}-avatar`) : document.getElementsByClassName('message--avatar');
    for (const elem of elems) {
      elem.src = cache[username];
    }
    return;
  }

  // Fetches data of the Twitch user
  fetch(endpoint(username), {
    "method": 'GET',
    "headers": {
      'Client-ID': clientId,
      'Authorization': "Bearer " + accessToken
    }
  }).then(r => {
    if (r.status < 200 || r.status > 299) {
      cache[username] = defaultAvatarUrl;
      return;
    }
    return r.json();
  }).then(({ data }) => {
    const [ user ] = data;
    cache[username] = user['profile_image_url'];
  }).catch(() => {
    cache[username] = defaultAvatarUrl;
  }).finally(() => {
    const elems = displayName !== null ? document.getElementsByClassName(`message-${displayName}-avatar`) : document.getElementsByClassName('message--avatar');
    for (const elem of elems) {
      elem.src = cache[username];
    }
  });
});
