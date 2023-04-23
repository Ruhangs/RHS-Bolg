import { useState } from 'react'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import MarkdownNavbar from 'markdown-navbar'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import Layout from '@/components/Layout'
import styles from './index.module.css'
import Link from 'next/link'
import dedupe from 'dedupe'
import { getNoteList, getNote } from '../api/request'


export default function Note({ notes, groups, data }) {
  const [unfold, setUnfold] = useState(true)

  const open = () => {
    if (unfold === true) {
      setUnfold(false)
    } else {
      setUnfold(true)
    }
  }

  return (
    <>
      <Head>
        <title>笔记</title>
      </Head>
      <div className={styles.content}>
        <svg t="1681613575895" onClick={open} className={`"icon" ${unfold === true ? styles.menu : styles.menuHidden}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3638" width="25" height="25"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM192.028 543.17h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.028c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM705.162 671.594l160-160-160-160z" fill="#ffffff" p-id="3639"></path></svg>
        <div className={`${unfold === false ? styles.cat : styles.fold}`} onClick={open}>
          <div className={styles.left}>
            <div className={styles.noteList}>
              <div className={`${styles.block} ${null === data.group ? styles.active : null} `} >
                <Link className={null === data.group ? 'active' : ''} href={`/Note/1`}>
                  <div className={styles.title}>
                    开始
                  </div>
                </Link>
              </div>
              {
                groups.map((group, index) => (
                  <div className={`${group === null ? styles.hidden : styles.block}`} key={index}>
                    {group}
                    <ul style={{ marginTop: '.8rem' }}>
                      {notes.map((note) => (
                        <li className={`${note.attributes.group === group ? styles.link : styles.hidden} ${note.attributes.title === data.title ? styles.active : null} `} key={note.id}>
                          <Link className={note.attributes.title === data.title ? 'active' : ''} href={`/Note/${note.id}`}>
                            <div className={styles.title}>
                              {note.attributes.title}
                              <i className={styles.arrow}>{'>'}</i>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              
            </div>
            <div className="copybottm" style={{ borderTop: `solid 1px #a3a3a36b` }}>
                ©2023 Ruhangs
              </div>
          </div>
          <div className={styles.right}>
            {/* <span>目录</span>  */}
            <MarkdownNavbar
              // className="article"
              source={data.context}
              headingTopOffset={20} //离顶部的距离
              ordered={false}   //是否显示标题题号1,2等
            />
            <div className="borderbotm"></div>

          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.nav}>{"笔记 > " + `${data.group === null ? '' : data.group + " > "} ` + data.title}</div>
          <Layout title={data.title}>
            <ReactMarkdown className={"markdown-body"} rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeKatex]} remarkPlugins={[remarkGfm, remarkMath]}>{data.context}</ReactMarkdown>
          </Layout>

        </div>
        <div style={{ width: "50rem" }}></div>

      </div>
    </>
  )
}


export async function getStaticPaths() {
  const notes = await getNoteList().then((res) => {
    return res.data
  })
  const paths = notes.map((note) => {
    return {
      params: {
        slug: String(note.id),
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {

  const notes = await getNoteList().then((res) => {
    return res.data
  })

  let groups = notes.map((note) => {
    note = JSON.stringify(note)
    note = JSON.parse(note)
    return note.attributes.group
  })

  groups = dedupe(groups)

  const data = await getNote(params.slug).then((res) => {
    return res.data.attributes
  })

  return {
    props: {
      notes,
      groups,
      data
    },
  };

}



