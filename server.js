const express = require('express')
const app = express()

console.log(__dirname + '/dist/mymoney-web')
app.use(express.static(__dirname + '/dist/mymoney-web'))

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/dist/mymoney-web/index.html')
})

app.listen(process.env.PORT || 4200)