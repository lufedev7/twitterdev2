import Button from '../../../components/button'
import useUser from '../../../hooks/useUser'
import { useState } from 'react'
import { addTwitt, fetchLatestTwitts } from '../../../firebase/client'
import { useRouter } from 'next/router'
const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}
export default function index () {
  const user = useUser()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [status, setEstatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const handlechange = (event) => {
    const { value } = event.target
    setMessage(value)
  }
  const hadleSubmit = (e) => {
    e.preventDefault()
    setEstatus(COMPOSE_STATES.LOADING)
    fetchLatestTwitts()
    addTwitt({
      avatar: user.photoURL,
      content: message,
      userId: user.uid,
      userName: user.displayName
    }).then(() => {
      router.push('/home')
    }).catch((err) => {
      console.log(err)
      setEstatus(COMPOSE_STATES.ERROR)
    })
  }
  const isButtonDissabled = !message.trim() || status === COMPOSE_STATES.LOADING
  return (
    <div className=' mr-2'>
        <form onSubmit={hadleSubmit}>
        <textarea placeholder="¿Qué esta pasando?"
        onChange={handlechange}
        value={message}
        className='border p-4 min-h-[200px] resize-none text-xs w-full  mobileg:max-w-[470px] mt-3 ml-2 mr-2 rounded-xl'></textarea>
        <div className='ml-2'>
        <Button disabled={isButtonDissabled}>Devtwitter</Button>
        </div>
        </form>

        </div>
  )
}
