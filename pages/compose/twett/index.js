import Button from '../../../components/button'
import useUser from '../../../hooks/useUser'
import { useState } from 'react'
import { addTwitt, storage } from '../../../firebase/client'
import { useRouter } from 'next/router'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Closed from '../../../components/icons/closed'
import Image from 'next/image'
// import { Head } from 'next/document'
const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}
const DRAG_IMAGE_STATE = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}
export default function Index () {
  const user = useUser()
  const router = useRouter()

  const [message, setMessage] = useState('')
  const [status, setEstatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  const [imgURL, setImgURL] = useState(null)

  const uploadImag = (file) => {
    const storageRefe = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRefe, file)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          console.log('Upload is running')
          break
      }
      console.log('estados totales', snapshot.state)
      return { snapshot }
    },
    (error) => {
      console.log(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL)
        setEstatus(COMPOSE_STATES.USER_NOT_KNOWN)
        setImgURL(downloadURL)
      })
    }
    )
  }

  const handlechange = (event) => {
    const { value } = event.target
    setMessage(value)
  }
  const hadleSubmit = (e) => {
    e.preventDefault()
    setEstatus(COMPOSE_STATES.LOADING)
    addTwitt({
      avatar: user.photoURL,
      content: message,
      userId: user.uid,
      userName: user.displayName,
      img: imgURL
    }).then(() => {
      router.push('/home')
    }).catch((err) => {
      console.log(err)
      setEstatus(COMPOSE_STATES.ERROR)
    })
  }
  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.DRAG_OVER)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
  }
  const handleDragDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
    setEstatus(COMPOSE_STATES.LOADING)
    const file = e.dataTransfer.files[0]
    uploadImag(file)
  }
  const isButtonDissabled = !message.trim() || status === COMPOSE_STATES.LOADING
  return (
    <div className=' mr-2 flex'>
      {user &&
      <div>
      <Image
      src={user.photoURL}
      width={40}
      height={40}
      alt='avatar profile'
      className='mx-2 my-2 rounded-full cursor-pointer'>

      </Image>
      </div> }

      <div className='w-full  mobileg:max-w-[470px]'>
      <form onSubmit={hadleSubmit}>
        <textarea placeholder="¿Qué esta pasando?"
        onChange={handlechange}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
        value={message}
        className={`${drag === DRAG_IMAGE_STATE.DRAG_OVER ? 'border-4 border-sky-400 border-dashed' : 'border-4 border-transparent border-solid'} 
        min-h-[140px] resize-none
        text-xs w-full  mobileg:max-w-[470px]
        mt-3 ml-2 mr-2 rounded-xl`}></textarea>
        {imgURL && <section className='relative grid  justify-items-center'>
          <div>
            <Closed className='w-7 h-7 ml-3 mt-2 absolute hover:scale-125 hover:brightness-125 cursor-pointer' fill='#fffff'/>  <img className='mb-3  rounded-xl w-[400px] h-72' src={imgURL} />
        </div>
        </section> }
        <div className='ml-2'>
        <Button disabled={isButtonDissabled}>Devtwitter</Button>
        </div>
        </form>

      </div>

        </div>
  )
}
