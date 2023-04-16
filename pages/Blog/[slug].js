import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import MarkdownNavbar from 'markdown-navbar'
import rehypeRaw from 'rehype-raw'
import Layout from '@/components/Layout'
import styles from './index.module.css'
import Link from 'next/link'
import dedupe from 'dedupe'
import { useState } from 'react'

export default function Note({p, notes, groups, content, data }) {
  console.log(p)


  const [unfold, setUnfold] = useState(false)

  const open = () => {
    if(unfold === true){
      setUnfold(false)
    }else{
      setUnfold(true)
    }
  }

  return (
    <>
      <div className={styles.content}>
        <svg t="1681613575895" className={`"icon" ${unfold === true ? styles.menu : styles.menuHidden}`} onClick={open} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3638" width="25" height="25"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM192.028 543.17h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.028c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM705.162 671.594l160-160-160-160z" fill="#ffffff" p-id="3639"></path></svg>
        <div className={`${unfold === false ? styles.cat : styles.fold}`} onClick={open}>
          <div className={styles.left}>
            <div className={styles.noteList}>
              <div className={`${styles.block} ${"index" === p ? styles.active : null} `} >
                {/* <li className={`${styles.link} ${"介绍" === data.title ? styles.active : null} `}> */}
                <Link className={"index" === p ? 'active' : ''} href={`/Blog/index`}>
                  <div className={styles.title}>
                    开始
                  </div>
                </Link>
                {/* </li> */}
              </div>
              {
                groups.map((group) => (
                  <div className={`${group === '' ? styles.hidden : styles.block}`} key={group.index}>
                    {group}
                    <ul style={{ marginTop: '.8rem' }}>
                      {notes.map((note) => (
                        <li className={`${note.group === group ? styles.link : styles.hidden} ${note.title === data.title ? styles.active : null} `} key={note.slug}>
                          <Link className={note.title === data.title ? 'active' : ''} href={`/Blog/${note.slug}`}>
                            <div className={styles.title}>
                              {note.title}
                              <i className={styles.arrow}>{'>'}</i>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.right}>
            {/* <span>目录</span>  */}
            <MarkdownNavbar
              // className="article"
              source={content}
              headingTopOffset={20} //离顶部的距离
              ordered={false}   //是否显示标题题号1,2等
            />
            <div className="borderbotm"></div>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.nav}>{"小记 > " + `${data.group === '' ? '' : data.group + " > "} ` + data.title}</div>
          <Layout title={data.title}>
            <ReactMarkdown className={"markdown-body"} rehypePlugins={[rehypeHighlight, rehypeRaw]} remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </Layout>
        </div>

      </div>
    </>
  )
}

const notesDirectory = path.join(process.cwd(), 'bolgs')

export async function getStaticPaths() {
  const filenames = fs.readdirSync(notesDirectory)
  const paths = filenames.map((filename) => {
    return {
      params: {
        slug: filename.replace('.md', ''),
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {

  const files = fs.readdirSync(notesDirectory);

  const notes = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const fullPath = path.join(notesDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      group: data.group
    };
  });

  let groups = notes.map((note) => {
    return note.group
  })

  groups = dedupe(groups)


  const filepath = path.join(notesDirectory, `${params.slug}.md`)
  const markdown = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(markdown);
  const p = params.slug

  return {
    props: {
      p,
      notes,
      groups,
      data,
      content
    },
  };

}



