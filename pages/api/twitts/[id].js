const { db } = require('../../../firebase/admin')

export default async (request, response) => {
  const { query } = request
  const { id } = query
  db.collection('posts').doc(id).get().then(
    doc => {
      const datas = doc.data()
      response.json(datas)
      console.log('data', datas)
    }
  ).catch(() => {
    response.status(404).end()
  })
}
