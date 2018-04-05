const router = require("express").Router()
const cfg = require("./config")
const token_callback = require("./get_token")

router.get("/callback-src", (req, res) => {
	res.sendFile(process.env.PWD + "/html/callback-src.html")
});

router.get("/callback-dest", (req, res) => {
	res.sendFile(process.env.PWD + "/html/callback-dest.html")
});

router.get("/send-token", (req, res) => {
	token_callback(req.query)
	res.send("ok")
});

router.get("/login-src", function(req, res) {
	var scopes = "user-library-read playlist-read-private user-follow-read";
	res.redirect("https://accounts.spotify.com/authorize?response_type=token" +
		"&client_id=" + cfg.CLIENT_ID +
		"&scope=" + encodeURIComponent(scopes) +
		"&redirect_uri=" + encodeURIComponent("http://localhost:8080/callback-src"));
});

router.get('/login-dest', function(req, res) {
	var scopes = 'user-library-modify playlist-modify-private user-follow-modify';
	res.redirect("https://accounts.spotify.com/authorize?response_type=token" +
		"&client_id=" + cfg.CLIENT_ID +
		"&scope=" + encodeURIComponent(scopes) +
		"&redirect_uri=" + encodeURIComponent("http://localhost:8080/callback-dest"));
});

module.exports = router