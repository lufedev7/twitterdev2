import styles from '../styles/feed.module.css'
import Twitts from '../components/sectionTwitt'
import useUser from '../hooks/useUser'
import InfiniteScroll from 'react-infinite-scroll-component'
import fechsHook from '../hooks/fechsHook'
import Link from 'next/link'
import Create from '../components/icons/Create'
import Home from '../components/icons/Home'
import Search from '../components/icons/Search'
import Styles from '../styles/Home.module.css'
import Head from 'next/head'
import PlaceHolder from '../components/icons/PlaceHolder'
import { getDocs, collection, orderBy, query, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase/client'
import { useState } from 'react'
export default function home () {
  const user = useUser()
  const useFechs = fechsHook()
  const [posts, setPosts] = useState(useFechs.fechs)
  // console.log('este es el useFech', useFechs.fechs)

  const getMorePosts = async () => {
    const colref = collection(db, 'posts')
    const querys = query(colref, orderBy('createdAt', 'desc'), startAfter(useFechs.lastVisible), limit(3))
    const snapshop = await getDocs(querys)
    const newSnapshop = snapshop.docs.map((doc) => {
      const data = doc.data()
      const id = doc.id
      return {
        id,
        ...data
      }
    })
    setPosts((posts) => [...posts, ...newSnapshop])
    console.log('ultimo', posts)

    // setLastVisible(snapshop.docs[snapshop.docs.length - 1])
  }
  return (
    <div>
      <Head>
        <title>Feed | TwitterDev</title>
      </Head>
      <header className={`${styles.header}
        z-50
        bg-white
        backdrop-filter
        backdrop-blur-lg
        bg-opacity-10
         flex place-items-center  sticky top-0  h-[49px] w-full mobileg:max-w-[500px]`}>
        <h2 className='font-bold ml-3 text-xl'>Inicio</h2>
      </header>

      {user &&
        <section className='pt-1 pb-[49px]'>
          {useFechs.fechs
            ? <InfiniteScroll
              dataLength={useFechs.fechs.length}
              next={getMorePosts}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            > {(useFechs.fechs.map((twitt) => (
              <Twitts key={twitt.id} post={twitt} date={twitt.createdAt} stateTwitt={true} />
            )))} </InfiniteScroll>
            : (<PlaceHolder />)}
        </section>
      }
      <nav className={`${styles.nav} fixed bg-white
        backdrop-filter}
        backdrop-blur-lg flex items-center justify-between
        bg-opacity-10 bottom-0 mobileg:bottom-[7vh]   h-[49px] min-w-[500px]`}
      >
        <Link href='/' className={`${Styles.hoverEffect} mx-1 `} >
          <Home stroke='#09f' height={35} width={35} />
        </Link >
        <Link href='/compose/twett' className={`${Styles.hoverEffect} mx-1 `}>
          <Create stroke='#09f' height={35} width={35} />
        </Link>
        <Link href='' className={`${Styles.hoverEffect} mx-1`}>
          <Search stroke='#09f' height={35} width={35} />
        </Link>
      </nav>
    </div>

  )
}
