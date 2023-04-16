import Head from 'next/head'
import styles from './index.module.css'

export default function Layout({ children, title = 'My Blog' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  )
}