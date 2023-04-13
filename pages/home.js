import styles from '../styles/feed.module.css'
import Twitts from '../components/sectionTwitt'
import useUser from '../hooks/useUser'
import fechsHook from '../hooks/fechsHook'
export default function home () {
  const user = useUser()
  const fechs = fechsHook()
  console.log(fechs)
  return (
    <div>
        <header className={`${styles.header}
        z-50
        bg-white
        backdrop-filter
        backdrop-blur-lg
        bg-opacity-10
         flex place-items-center  sticky top-0  h-[49px] w-full mobileg:max-w-[500px]`}>
            <h2 className='font-bold ml-3 text-xl'>Inicio</h2>
        </header>
        { user &&
        <section className='pt-1'>
            {fechs && fechs.map((twitt) => (
              <Twitts key = {twitt.id} post ={twitt}/>
            ))}
        </section>
        }
        <nav className={`${styles.nav} fixed bg-white
        backdrop-filter
        backdrop-blur-lg
        bg-opacity-10 bottom-0 mobileg:bottom-[7vh]    h-[49px] min-w-[500px]`} >

        </nav>
        </div>

  )
}
