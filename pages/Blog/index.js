import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from './index.module.css'
import Link from 'next/link'
import dedupe from 'dedupe'
import dayjs from 'dayjs'
import { getBlogList } from '../api/request'

export default function Blog({ studies, works, lives, groups }) {

  return (
    <div>
      <Head>
        <title>个人博客</title>
      </Head>
      {/* <!-- 顶部导航 --> */}
      <div className="navigation">
        <div className="nav-titleBox co zz">
          {/* <!-- 标题 --> */}
          <div className="co-right">
            <span className="titleBox-tag">Photo!</span>
            <h1 style={{ margin: 0 }}>
              life is like a box of chocolates .
            </h1>
            <a className="buttom navbtn" href="#next-one">生活就像巧克力
            </a>
          </div>
        </div>
      </div>

      {/* <!-- 主要修改部分 --> */}
      <div className={styles.content + ' ' + "content zz"}>
        {/* <!-- 主要内容部分 --> */}
        <div id="next-one">
          <div className={"content-li" + " " + "li1" + " " + styles.li1Layout}>
            <div className={styles.li1Box + ' ' + "borderbefore"}>
              <span>Study</span>
              <span className={styles.tag}>{studies.length}</span>
              <div className="borderbotm"></div>
              <p>学习</p>
            </div>
            <div className={styles.li1Box + ' ' + "borderbefore"}>
              <span>Live</span><span className={styles.tag}>{lives.length}</span>
              <div className="borderbotm"></div>
              <p>生活</p>
            </div>
            <div className={styles.li1Box + ' ' + "borderbefore"}>
              <span>Work</span><span className={styles.tag}>{works.length}</span>
              <div className="borderbotm"></div>
              <p>工作</p>
            </div>
          </div>
          {
            groups.map((group, index) => (
              <div className="content-li li2" key={index}>
                <h3>
                  <span>{group === 'study' ? "学习令我快乐" : group === 'live' ? "记录生活美好瞬间" : "工作中的点点滴滴"}</span>
                  <div className="borderbotm"></div>
                  <span>{`0${index + 1}`}</span>
                </h3>
                <div className={styles.li2Box} >
                  {
                    group === 'study' ? studies.map((item) => (

                      <Link className={styles.li2BoxItem + ' ' + "carbox"} href={`/Blog/detail/${item.id}`} key={item.id}>
                        <img src={`http://47.115.201.17:1337/`} alt="" />
                        <div className={styles.boxitemTitle}>
                          <h6>{item.attributes.group}</h6>
                          <span>发文时间：{dayjs(item.attributes.publishedAt).format("YYYY-MM-DD")}</span>
                        </div>
                      </Link>

                    )) : group === 'live' ? lives.map((item) => (

                      <Link className={styles.li2BoxItem + ' ' + "carbox"} href={`/Blog/detail/${item.id}`} key={item.id}>
                        <img src="./img/pic1.jpg" alt="" />
                        <div className={styles.boxitemTitle}>
                          <h6>{item.attributes.group}</h6>
                          <span>发文时间：{dayjs(item.attributes.publishedAt).format("YYYY-MM-DD")}</span>
                        </div>

                      </Link>

                    )) : works.map((item) => (

                      <Link className={styles.li2BoxItem + ' ' + "carbox"} href={`/Blog/detail/${item.id}`} key={item.id}>
                        <img src="./img/pic1.jpg" alt="" />
                        <div className={styles.boxitemTitle}>
                          <h6>{item.attributes.group}</h6>
                          <span>发文时间：{dayjs(item.attributes.publishedAt).format("YYYY-MM-DD")}</span>
                        </div>
                      </Link>

                    ))
                  }
                </div>
              </div>))
          }
        </div>
      </div>
      <div className={styles.footer}>
        <div style={{width: "85%", margin: `0 auto`}}>
          <h3>©2023 Ruhangs. All rights reserved.</h3>
        </div>
      </div>
    </div>
  )
}


export async function getStaticProps({ params }) {
  const blogs = await getBlogList().then((res) => {
    return res.data
  })

  let groups = blogs.map((blog) => {
    return blog.attributes.group
  })
  groups = dedupe(groups)

  const studies = blogs.filter((blog) => {
    return blog.attributes.group === 'study'
  })

  const works = blogs.filter((blog) => {
    return blog.attributes.group === 'work'
  })

  const lives = blogs.filter((blog) => {
    return blog.attributes.group === 'live'
  })


  return {
    props: {
      studies,
      works,
      lives,
      blogs,
      groups
    }
  }
}