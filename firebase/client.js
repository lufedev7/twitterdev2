import { initializeApp, getApps } from 'firebase/app'
import { signInWithPopup, GithubAuthProvider, getAuth } from 'firebase/auth'
import { addDoc, getFirestore, collection } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'devtwitterv2.firebaseapp.com',
  projectId: 'devtwitterv2',
  storageBucket: 'devtwitterv2.appspot.com',
  messagingSenderId: '44753160535',
  appId: '1:44753160535:web:d2458f14d7b670dc651612',
  measurementId: 'G-QP00643MRM'
}
let app
!getApps().length && (app = initializeApp(firebaseConfig))

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage(app)

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  return signInWithPopup(auth, githubProvider)
}
export const addTwitt = ({ avatar, content, userId, userName, img }) => {
  const createdAt = new Date()
  return addDoc(collection(db, 'posts'), {
    avatar,
    content,
    userId,
    userName,
    createdAt,
    likesCount: 0,
    sharedCount: 0,
    img
  })
}
export const uploadimage = async (file) => {
  const storageRefe = ref(storage, `images/${file.name}`)
  const uploadTask = uploadBytesResumable(storageRefe, file)

  // console.log('prueba del valor', prueba)
  return uploadTask
}
