const request = require("request")
const app = require("express")()

app.listen(8080)
app.use("/", require("./src/routing.js"))

console.log("Please open http://localhost:8080/login-src in incognito tab and login to your SOURCE account (the one you want to copy)")

