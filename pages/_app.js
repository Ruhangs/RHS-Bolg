import '@/styles/globals.css'
import '@/styles/github-markdown.css'
import Nav from '@/components/Nav'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}
