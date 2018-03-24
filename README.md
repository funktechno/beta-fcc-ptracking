Welcome to the Gomix Template 1
==============================

A starter project for learning Gomix

### Setup:

 * .env 
   * SECRET=masterpw
   * USER="masteruser
   * Launch a sandbox mongodb using [mlab](https://mlab.com/home). Just MongoDB create a new Deployment and add a new user to the deployment. You get .5 gb which should be plenty if only tracking your own usage
   ```
    DB_USER=
    DB_PASS=
    DB_DOMAIN=
    DB_NAME=
   ```

* based on: https://glitch.com/edit/#!/playlistweek7
* liked this project: https://hyperdev.com/#!/project/maze-stealer
* based mongo iterations from: https://nettle-beast-mongoose.glitch.me/

### Notes:

* basically playlistweek7 was saving progress to glitch in the playlist-store.js, but you probably want your progress & finished projects hidden from others. As such we use a mongo db w/ the credentials hidden in the .env file & basic auth for you personally only to be able to login
* I was using playlistweek7 basic setup so it is fairly flat, you could make the list deeper for better section & genre support

### Features:

* track challenge progression in personal sandbox instance of mongodb
* basic auth for you personally