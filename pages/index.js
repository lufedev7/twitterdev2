import Git from '../components/git'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { loginWithGitHub } from '../firebase/client'
import { useRouter } from 'next/router'
import Button from '../components/button'
import useUser, { USER_STATES } from '../hooks/useUser'

export default function Home () {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])
  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        // console.log(user.user)
        this.user = user.user
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // console.log(user)
  return (
      <section >
        <div className="flex-col items-center mt-[25%] justify-center">
          <div className="flex  justify-center">
            <Image
              src="/twitter-logo-6.png"
              alt="logo the twitter"
              width={80}
              height={80}
            ></Image>
          </div>
          <h1 className={`${styles.title} font-bold`}>TwitterDev</h1>

          <h2 className="text-center">
            Talk about development <br />
            with developers
          </h2>
          <div className="flex justify-center mt-3">
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick ={handleClick}>
                <Git fill="#fff" className="mr-2" />
                Login with GitHub
              </Button>
            )}

            {user === USER_STATES.NOT_KNOWN && (
              <div className='flex items-center bg-blue-200 rounded-2xl px-2 py-1'>
                <img src="/ZKZg.gif"></img>
              </div>
            )}
          </div>
        </div>
      </section>
  )
}
