const cfg = require("./config")
const request = require("request")

let following = []

let count = 0

module.exports = function () {
	pullfollowing()
}

function pullfollowing(url = "https://api.spotify.com/v1/me/following?type=artist&limit=50") {
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
			console.log(cfg)
			console.log(body)
			return
		}
		body = JSON.parse(body)
		console.log("Pull following", count + "/" + body.artists.total)
		count +=50
		for (let i of body.artists.items)
		following.push(i.id)
		if (body.artists.next)
			pullfollowing(body.artists.next)
		else
			pushfollowing()
	})
}

function pushfollowing() {
	request({
		url: "https://api.spotify.com/v1/me/following?type=artist&ids=" + following.slice(0, 50).join(","),
		method: "PUT",
		headers: {
			Authorization: "Bearer " + cfg.dest_account_token,
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	}, (err, res, body) => {
		console.log("Put following:", following.length, "left")
		following = following.slice(50)
		if (following.length)
			pushfollowing()
		else
			done()
	})
}

function done() {
	console.log("Album copy done")
}