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
  
  ```html
  <!-- item will be appened to this layout -->
  <div id="log" class="sl__chat__layout"></div>

  <!-- chat item -->
  <script type="text/template" id="chatlist_item">
    <div data-from="{from}" data-id="{messageId}">
      <div class="meta">
        <div class="pic">
          <img class="message-{from}-avatar" src="{Your Default Image URL here}" width="32" height="32" alt="">
        </div>
      </div>
      <div class="message">
        <div class="author" style="color: {color}">
          <div class="badges"></div>
          <div class="name">{from}</div>
        </div>
        {message}
      </div>
    </div>
  </script>
  ```
</details>

<details><summary>CSS</summary>
  
  ```css
  * {
    display;
      box-sizing: border-box;
  }

  html, body {
      height: 100%;
      overflow: hidden;
  }

  body {

      font-family: 'Comfortaa';
      font-size: {font_size};
      font-weight: 700;
      line-height: 1.5em;
      color: {text_color}
  }

  .colon {
    display: none;
  }

  #log {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 10px 10px;
    width: 100%;
    box-sizing: border-box;
  }

  #log > div {
    display: table;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right;
    padding-bottom: 20px;
    box-sizing: border-box;
    animation: fadeIn 1s ease forwards, fadeOut 1s ease {message_hide_delay} forwards;
    -webkit-animation: fadeIn 1s ease forwards, fadeOut 1s ease {message_hide_delay} forwards;
  }

  #log > div:last-child {
    padding-bottom: 0;
  }

  #log > div.deleted {
    visibility: hidden;
  }

  /* Avatar PFP section */
  #log .meta {
    text-align: right;
    padding-right: 10px;
    box-sizing: border-box;
    vertical-align: top;
    display: table-cell;
  }

  /* User message section */
  #log .message {
    word-wrap: break-word;
    width: 100%;
    letter-spacing: 0.5px;
    color: #fff;
    text-shadow: 0 1px 0 rgba(0,0,0,0.1);
    text-align: left;
    vertical-align: middle;
  }
    #log .message .author {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      text-shadow: none;
    }
      #log .message .author .badges {
        display: flex;
      }

  /* Emotes within the messages */
  #log .emote {
    display: inline;
    line-height: 1em;
    padding-left: 0.25em;
    padding-right: 0.25em;
    box-sizing: border-box;
    position: relative;
    background-image: none !important;
    vertical-align: bottom;
  }
    #log .emote > img {
      width: auto;
      height: 1.9em;
    }

  /* The avatar that shows up on the left of the message/name */
  #log .pic{

  }
    #log .pic > img {
      border-radius: 50%;
    }

  /* Name and badge section */
  .badge {
    display: block;
    height: 1em;
    margin-right: 0.3em;
    vertical-align: middle;
  }
    .name {
        line-height: 1em;
        vertical-align: middle;
    }
  ```
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
