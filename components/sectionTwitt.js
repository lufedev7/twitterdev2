import Image from 'next/image'
// import useTimeAgo from '../hooks/useTimeAgo'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function Sectionpost ({ post, date, stateTwitt }) {
  const timeAgo = 'hola' // useTimeAgo(date)
  console.log('este es la hora', date)
  const router = useRouter()
  const handleArticleClick = (e) => {
    e.preventDefault()
    if (stateTwitt) {
      router.push(`/status/${post.id}`)
    }
  }

  return (
    <article
      onClick={handleArticleClick}
      className='hover:bg-sky-100/25 cursor-pointer flex mt-3 border mx-2  rounded-lg shadow-sm shadow-blue-300/50 bg'
    >
      <div className='max-w-[50px] '>
        <Image
          alt='section twitts'
          src={post.avatar}
          width={50}
          height={50}
          className='rounded-full'
        ></Image>
      </div>

      <div className='max-w-[450px] ml-2'>
        <div className='flex items-center'>
          <h1 className='font-bold'>{post.userName}</h1>
          <Link href='/home'>
            <time className='text-[12px] opacity-50 ml-2'>{timeAgo}</time>
          </Link>
        </div>
        <p>{post.content}</p>
        {post.img && (
          <Image
            src={post.img}
            alt='img section'
            width={350}
            height={310}
            className='rounded-xl mb-4 w-auto h-auto'
          ></Image>
        )}
      </div>
    </article>
  )
}
