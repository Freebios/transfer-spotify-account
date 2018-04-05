const cfg = require("./config")
const request = require("request")

let albums = []

module.exports = function () {
	pullalbums()
}

function pullalbums(url = "https://api.spotify.com/v1/me/albums?limit=50") {
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
		console.log("Pull albums", body.offset + "/" + body.total)
		for (let i of body.items)
		albums.push(i.album.id)
		if (body.next)
			pullalbums(body.next)
		else
			pushalbums()
	})
}

function pushalbums() {
	request({
		url: "https://api.spotify.com/v1/me/albums?ids=" + albums.slice(0, 50).join(","),
		method: "PUT",
		headers: {
			Authorization: "Bearer " + cfg.dest_account_token,
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	}, (err, res, body) => {
		console.log("Put albums:", albums.length, "left")
		albums = albums.slice(50)
		if (albums.length)
			pushalbums()
		else
			done()
	})
}

function done() {
	console.log("Album copy done")
}