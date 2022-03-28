# Streamlabs - Chat with Avatars
Custom HTML/CSS/JS to have Twitch profile pic showing alongside with chat messages of the Chat box widget. <br />

*You can also change the font size and color within the Streamlabs Chat box widget setting without messing with the codes.*

##### Preview
![preview](https://user-images.githubusercontent.com/40627143/160465881-bf89c370-1695-4b1c-92b4-03bb61bf8c31.png)

## Instructions

### Getting your Client ID
Before you do anything, you want to make your own client application by going to https://dev.twitch.tv/ and logging with your Twitch account. This is important as you need to get a client ID from it once it has been created. <br />

Once you are logged in, go to `Your Console` and click on the `Applications` tab. There will be a button "Register an Application". <br />

You can put whatever you want in the `Name` & the category can be anything as well. I would put "website integration". <br />

The most important input you need to do is the `OAuth Redirect URLs`. In the Redirect URLs, you want to put and then add: `https://twitchapps.com/tokengen/`. <br />

Once added, make sure you hit save. Now you want to copy your Client ID (or keep the site open until you get to the part needed for it). You'll need this for your OAuth token generator and JS.

---

### Setting up the Custom Chat
Login to your [Streamlabs](https://streamlabs.com/) dashboard. <br />

Now go and click `All Widgets` in the left side navigation then **Chat Box** (or Streamlabs Desktop/SLOBS Chat Box widget). <br />
![leftnavipreview](https://user-images.githubusercontent.com/40627143/160467839-43a584fb-223f-4bc7-957d-8bba53456c28.png) <br />

Find `Enable Custom HTML/CSS` and have it as `Enabled` selected. <br />

Here you will paste the codes in the HTML, CSS, and JS. You can get the codes for them here: [HTML](code/index.html), [CSS](code/style.css), [JS](code/functions.js) <br />

---

### Getting the OAuth token
Go to the [Twitch OAuth Token Generator](https://twitchapps.com/tokengen/) to generate your token <br />

Copy and paste your Client ID from your newly created application from Twitch Developer You don't need to do anything with the `Scopes`. <br />

Now click on `Connect` and it will give you a token. You will need this for your JS.

---

### Editing & Inputting into Codes
The most important part in editting are the following: <br/>
##### JS
  
```js 
const clientId = '{Your Client ID here}';
var accessToken = '{Your OAuth token here}';
const defaultAvatarUrl = '{Your default Image URL here}';
```

##### HTML
  
```html
<img class="message-{from}-avatar" src="{Your Default Image URL here}" width="32" height="32" alt="">
```

Insert/paste all the necessary keys that you need as mentioned above. <br />
- `{Your Client ID here}` is the ID from the application you made at Twitch Developer.
- `{Your OAuth token here}` is the generated token from [Twitch OAuth Token Generator](https://twitchapps.com/tokengen/).
- `{Your default Image URL here}` is the URL of your choice that you want it to look like if those on Twitch don't have a profile image.

---

##### Advanced coding/editting
You are welcome to edit anything if you know what you are doing.

## Fequently Asked Questions
- The profile pic goes back to my default image even though the Twitch user has a profile pic. Why?
  - It is most likely the OAuth token expired or is wrong. I suggest generating a new token.
- I want the avatar pic to be smaller/bigger
  -  Just edit the values in the html where is says `width` & `height` of the `IMG` tag.

## Credits 
Original source code from [drakantas](https://github.com/drakantas)
