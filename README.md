# Streamlabs - Chat with Avatars
Custom HTML/CSS/JS to have Twitch profile pic showing alongside with chat messages of the Chat box widget

##### Preview
![preview](https://user-images.githubusercontent.com/40627143/160465881-bf89c370-1695-4b1c-92b4-03bb61bf8c31.png)

## Instructions

### Getting your Client ID
Before you do anything, you want to make your own client application by going to [https://dev.twitch.tv/](https://dev.twitch.tv/) and logging with your Twitch account. This is important as you need to get a client ID from it once it has been created. <br />

Once you are logged in, go to "Your Console" and click on the "Applications" tab. There will be a button "Register an Application". <br />

You can put whatever you want in the "Name" & the category can be anything as well. I would put website integration. <br />

The most important input you need to do is the OAuth Redirect URLs. In the Redirect URLs, you want to put and then add: `https://twitchapps.com/tokengen/`. <br />

Once added, make sure you hit save. Now you want to copy the Client ID and paste it into the "clientId" of the JS coding <br />(it'll be where `{Your Client ID here}` is at).

---

### Setting up the Custom Chat
Login to your [Streamlabs](https://streamlabs.com/) dashboard. <br />
Now go and click "All Widgets" in the left side navigation then Chat Box (or Streamlabs Desktop/SLOBS Chat Box widget). <br />
Find `Enable Custom HTML/CSS` and have "Enabled" selected. <br />
Here you will paste the codes in the HTML, CSS, and JS. <br />
