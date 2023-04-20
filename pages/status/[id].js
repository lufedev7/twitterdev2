import Twitts from '../../components/sectionTwitt'
export default function Id ({ serverResponse }) {
  const normalDate = new Date(serverResponse.createdAt._seconds * 1000).toLocaleString('en-US', { timeZone: 'America/Bogota' })
  const timestamp = Date.parse(normalDate)

  return (
    <div>
        <Twitts post={serverResponse} date={timestamp}/>
       hola
        </div>
  )
}
export async function getServerSideProps (context) {
  const { query, res } = context
  const { id } = query
  // const key = 'http://localhost:3000/api/twitts/' + id
  const key = 'https://twitterdev2.vercel.app/api/twitts/' + id

  const serverResponse = await fetch(key).then((resp) => {
    if (resp.ok) return resp.json()
  }).catch(err => {
    // res.writeHead(404).end()
    res.writeHead(301, { location: '/home' }).end()
    console.log(err)
  })

  return {
    props: {
      serverResponse
    }
  }
}
