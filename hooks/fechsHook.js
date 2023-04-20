import { useEffect, useState } from 'react'
import { getDocs, collection, orderBy, query, limit } from 'firebase/firestore'
import { db } from '../firebase/client'

export default function FechsHook () {
  const [fechs, setFechs] = useState(null)
  useEffect(() => {
    (async () => {
      const colref = collection(db, 'posts')
      const querys = query(colref, orderBy('createdAt', 'desc'), limit(50))
      const snapshop = await getDocs(querys)
      setFechs(snapshop.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        return {
          id,
          ...data
        }
      }))
    })()
  }, [])
  return fechs
}
