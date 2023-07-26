const fs = require('fs')

async function dataSave(data, name) {
    const datastr = JSON.stringify(data, null, '\t');
    fs.writeFileSync(`./pages/data/${name}.json`, datastr);
}

export default function handler(req, res) {
    const { id } = req.query

    const notidata = req.body.data

    var dataBuffer = fs.readFileSync('./pages/data/data.json')
    var dataJSON = dataBuffer.toString()
    var data = JSON.parse(dataJSON)

    data[id].noti = notidata

    dataSave(data, 'data')

    res.status(200)
    res.end()
}