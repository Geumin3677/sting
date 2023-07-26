const fs = require('fs')


export default function handler(req, res) {
    const { body } = req

    var dataBuffer = fs.readFileSync('./pages/data/data.json')
    var dataJSON = dataBuffer.toString()
    var data = JSON.parse(dataJSON)
    
    res.status(200).json({
        res: data[body.id].cnt
    })
    res.end()
}