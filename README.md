# transfer-spotify-account
A non user friendly node script to copy Tracks, Albums and Artists from one Spotify account to another

Don't mind the poor code quality I did this quickly :scream::scream::scream: (program doesn't even exit at the end lol)

If my spotify app get disabled, change it in config.js

# Usage

To run this you need node installed: https://nodejs.org/

To init the project type
> npm install

To start program
>node index.js

Then you will be promted to open an url in an **incognito** tab (to avoid conflict with your current Spotify session), login with your **source** account. Then close the window.

Now you have to login to your **destination** account, check the console again for the link. Please make sure you did close your previous incognito window to avoid coping data to the same account). Then you can close the window and the sync begin.