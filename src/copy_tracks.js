const cfg = require("./config")
const request = require("request")

let tracks = []

module.exports = function () {
	pulltracks()
}

function pulltracks(url = "https://api.spotify.com/v1/me/tracks?limit=50") {
	request({
		url,
		method: "GET",
		headers: {
			Authorization: "Bearer " + cfg.src_account_token,
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	}, (err, res, body) => {
		if (res.statusCode != 200) {
			console.log(body)
			return
		}
		body = JSON.parse(body)
		console.log("Pull tracks", body.offset + "/" + body.total)
		for (let i of body.items)
			tracks.push(i.track.id)
		if (body.next)
			pulltracks(body.next)
		else
			pushtracks()
	})
}

function pushtracks() {
	request({
		url: "https://api.spotify.com/v1/me/tracks?ids=" + tracks.slice(0, 50).join(","),
		method: "PUT",
		headers: {
			Authorization: "Bearer " + cfg.dest_account_token,
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	}, (err, res, body) => {
		console.log("Put tracks:", tracks.length, "left")
		tracks = tracks.slice(50)
		if (tracks.length)
			pushtracks()
		else
			done()
	})
}

function done() {
	console.log("Track copy done")
}