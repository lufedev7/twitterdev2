import { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase/client'

export default function fechsHook () {
  const [fechs, setFechs] = useState(null)
  useEffect(() => {
    (async () => {
      const colref = collection(db, 'posts')
      const snapshop = await getDocs(colref)
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
