import { useEffect, useState } from 'react'
import { getDocs, collection, orderBy, query, limit } from 'firebase/firestore'
import { db } from '../firebase/client'

export default function FechsHook () {
  const [fechs, setFechs] = useState(null)
  const [lastVisible, setLastVisible] = useState(null)
  useEffect(() => {
    (async () => {
      const colref = collection(db, 'posts')
      const querys = query(colref, orderBy('createdAt', 'desc'), limit(5))
      const snapshop = await getDocs(querys)
      setFechs(snapshop.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        return {
          id,
          ...data
        }
      }))
      setLastVisible(snapshop.docs[snapshop.docs.length - 1])
    })()
  }, [])
  // console.log('last', lastVisible)
  return {
    lastVisible,
    fechs
  }
}
