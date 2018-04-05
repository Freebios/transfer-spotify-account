const cfg = require("./config")

module.exports = function (token) {
	if (token.type === "src") {
		cfg.src_account_token = token.access_token
		console.log("Open http://localhost:8080/login-dest in a new incognito tab and log to your dest account")
	} else if (token.type === "dest") {
		cfg.dest_account_token = token.access_token
	}
	if (cfg.src_account_token && cfg.dest_account_token) {
		const cpy_tracks = require("./copy_tracks")
		const cpy_albums = require("./copy_albums")
		const cpy_followed = require("./copy_followed")

		cpy_followed()
		cpy_albums()
		cpy_tracks()
	}
}