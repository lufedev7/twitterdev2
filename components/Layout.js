import styles from '../styles/Home.module.css'
export default function Layout ({ children }) {
  return (
    <div className={styles.divPrimary}>
        <main className={`${styles.box}`}>
            {children}
        </main>
    </div>
  )
}
