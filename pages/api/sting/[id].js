const webpush = require('web-push')

const fs = require('fs')

async function dataSave(data, name) {
    const datastr = JSON.stringify(data, null, '\t');
    fs.writeFileSync(`./pages/data/${name}.json`, datastr);
}

export default async function handler(req, res) {
    const { id } = req.query

    var dataBuffer = fs.readFileSync('./pages/data/data.json')
    var dataJSON = dataBuffer.toString()
    var data = JSON.parse(dataJSON)

    data[id].cnt += 1

    dataSave(data, 'data')

    const keys = {
        publicKey : process.env.NEXT_PUBLIC_PUBLIC_KEY,
        privateKey : process.env.NEXT_PUBLIC_PRIVATE_KEY
    }

    webpush.setVapidDetails(
        "mailto:geumin3677@gmail.com",
        keys.publicKey,
        keys.privateKey
    )

    var name
    var cid
    if(id == "park9m1n"){
        name = "박구민"
        cid = "hyo_oing"
    } else {
        name = "장효은"
        cid = "park9m1n"
    }

    await webpush.sendNotification(
        {
            endpoint: data[cid].noti.endpoint,
            keys: data[cid].noti.keys
        },
        JSON.stringify({title:`${name}님이 당신을 콕 찔렀습니다.`, body:`아야! ${name} 한테 찔렸다`})
    )

    res.status(200)
    res.end()
}