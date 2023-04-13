import { initializeApp, getApps } from 'firebase/app'
import { signInWithPopup, GithubAuthProvider, getAuth } from 'firebase/auth'
import { addDoc, getFirestore, collection } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyB87cquABB3uOGKug78ON8WR0dqKKVPdzQ',
  authDomain: 'devtwitterv2.firebaseapp.com',
  projectId: 'devtwitterv2',
  storageBucket: 'devtwitterv2.appspot.com',
  messagingSenderId: '44753160535',
  appId: '1:44753160535:web:d2458f14d7b670dc651612',
  measurementId: 'G-QP00643MRM'
}
!getApps().length && initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  return signInWithPopup(auth, githubProvider)
}
export const addTwitt = ({ avatar, content, userId, userName }) => {
  const createdAt = new Date()
  return addDoc(collection(db, 'posts'), {
    avatar,
    content,
    userId,
    userName,
    createdAt,
    likesCount: 0,
    sharedCount: 0
  })
}
export const fetchLatestTwitts = () => {
  return collection(db, 'posts').get()
    .then(snapshop => {
      return snapshop.docs.map(doc => {
        const data = doc.data()
        console.log(data)
        return data
      })
    })
}
/* const colref = collection(db, 'posts')
  const a = await getDocs(colref)
  console.log(a)
  return a */
