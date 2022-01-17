const { MongoClient } = require('mongodb')
const express = require('express')

const dbClient = new MongoClient('mongodb://127.0.0.1:27017')
const app = express()

app.use(express.json())

async function connectDriftBottleCollection () {
  await dbClient.connect()
  return dbClient.db('test').collection('drift-bottle')
}

app.get('/driftBottle/salve.json', async (req, res, next) => {
  try {
    const { user, type = 'all' } = req.query

    if (!user) {
      res.status(422).json({
        error: '请求参数不符合'
      })
    }

    const params = {
      owner: user
    }
    if (type !== 'all') {
      params.type = type
    }

    const collection = await connectDriftBottleCollection()
    const ret = await collection.findOne(params)

    res.status(201).json({
      code: 1,
      msg: ret
    })
  } catch (error) {
    next(error)
  }
})

app.post('/driftBottle.json', async (req, res, next) => {
  try {
    const driftBottle = req.body
    const collection = await connectDriftBottleCollection()

    if (!driftBottle) {
      res.status(422).json({
        error: '请求参数不符合'
      })
    }

    if (!driftBottle.time) {
      driftBottle.time = new Date()
    }
    const ret = await collection.insertOne(driftBottle)

    res.status(201).json({
      code: 1,
      msg: '操作成功'
    })
  } catch (error) {
    next(error)
  }
})

app.use((error, req, res, next) => {
  res.status(500).json({
    code: 0,
    msg: error.message
  })
})

app.listen(30000, () => {
  console.log('app running...')
})