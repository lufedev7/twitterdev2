import Image from 'next/image'
export default function sectionpost ({ post }) {
  return (
    <div className='flex mt-3 border mx-2  rounded-lg shadow-sm shad-blue-300/50'>
        <div className='max-w-[50px] '>
        <Image
                        alt={post.username}
                        src={post.avatar}
                        width={50}
                        height={50}
                        className='rounded-full'
                        >
                        </Image>
        </div >
        <div className='max-w-[450px] ml-2'>
        <h2 className='font-bold'>{post.userName}</h2>
        <p>{post.content}</p>
        </div>

    </div>
  )
}
