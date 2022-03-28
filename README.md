# Streamlabs - Chat with Avatars
Custom HTML/CSS/JS to have Twitch profile pic showing alongside with chat messages of the Chat box widget

## Instructions

###### Getting your Client ID
Before you do anything, you want to make your own client application by going to [https://dev.twitch.tv/](https://dev.twitch.tv/) and logging with your Twitch account. This is important as you need to get a client ID from it. Once you are logged in, go to "Your Console" and click on the "Applications" tab. There will be a button "Register an Application". You can put whatever you want in the "Name". The most important input you need to do is the OAuth Redirect URLs. In the Redirect URLs, you want to put and then add: `https://twitchapps.com/tokengen/`. Once added, make sure you hit save. Now you want to copy the Client ID and paste it into the "clientId" of the JS coding (it'll say `{Your Client ID here}`).

###### Setting up the Custom Chat
Go to your [Streamlabs](https://streamlabs.com/) dashboard > All Widgets > Chat Box (or Streamlabs Desktop/SLOBS Chat Box widget) <br />
Find `Enable Custom HTML/CSS` and have "Enabled" selected <br />
Here you will paste the codes in the HTML, CSS, and JS <br />
<details><summary>HTML</summary>
</details>

<details><summary>CSS</summary>
  
</details>

<details><summary>Javascript</summary>
  
  ```js
  // Variables and constructs
    const clientId = '{Your Client ID here}'; // Only need to edit if you are doing your own Twitch app registry

    // URLs to use
    const redirectUrl = 'https://twitchapps.com/tokengen/&scope=';
    const defaultAvatarUrl = '{Your default Image URL here}';

    // I wouldn't touch this unless you know what you are doing
    const endpoint = channelName => `https://api.twitch.tv/helix/users?login=${channelName}`;
    var oauthUrl = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUrl}`;

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
  ```
</details>
