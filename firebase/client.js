import { initializeApp, getApps } from 'firebase/app'
import { signInWithPopup, GithubAuthProvider, getAuth } from 'firebase/auth'

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

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  const auth = getAuth()
  return signInWithPopup(auth, githubProvider)
}
