import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from './index.module.css'
import Link from 'next/link'
import dedupe from 'dedupe'
import dayjs from 'dayjs'
import { getProjectList } from '../api/request'
import { handelrImgUrl } from '@/util/tool'

export default function Blog({ projects }) {
  console.log(projects)

  return (
    <div>
      <Head>
        <title>项目</title>
      </Head>
      <div className="navigation">
        <div className="nav-titleBox co zz">
          <div className="co-right">
            <span className="titleBox-tag">PORTFOLIO!</span>
            <h1 style={{ margin: 0 }}>
              Great minds have purpose
            </h1>
            <a className="buttom navbtn" href="#next-one" style={{marginTop: "2rem"}}>了解一下这些项目吧
            </a>
          </div>
        </div>
      </div>

      {/* <!-- 主要修改部分 --> */}
      <div className={styles.content + ' ' + "content zz"}>
        {/* <!-- 主要内容部分 --> */}
        <div id="next-one">
          <div className="content-li li2" >
            <h3>
              <div className="borderbotm" style={{opacity: 0}}></div>
              <span className={styles.intro}>一些开源实践，练手项目，欢迎使用与贡献</span>
              <div className="borderbotm" style={{opacity: 0}}></div>
            </h3>
            <div className={styles.li2Box} >
              {
                projects.map((project) => (

                  <Link className={styles.li2BoxItem + ' ' + "carbox"} href={project.attributes.address} key={project.id}>
                    <img src={handelrImgUrl(project.attributes.cover)} alt="" />
                    <div className={styles.boxitemTitle}>
                      <h6>{project.attributes.name}</h6>
                      <span>{project.attributes.abstract}</span>
                    </div>
                  </Link>

                ))
              }
            </div>
          </div>
          <div className="borderbotm"></div>
          <div className="carbox copybottm">
            ©2023 Ruhangs
          </div>
        </div>
      </div>
    </div>
  )
}


export async function getStaticProps({ params }) {
  const projects = await getProjectList().then((res) => {
    return res.data
  })

  return {
    props: {
      projects
    }
  }
}