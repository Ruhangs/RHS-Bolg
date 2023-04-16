import React from 'react'
import Head from 'next/head'
import Nav from '@/components/Nav'
import styles from './index.module.css'

export default function Blog() {
  return (
    <div>
      <Head>
          <title>项目</title>
      </Head>
      {/* <!-- 顶部导航 --> */}
      <div className="navigation">
        <div className="nav-titleBox co zz">
          {/* <!-- 标题 --> */}
          <div className="co-right">
            <span className="titleBox-tag">Photo!</span>
            <h1 style={{margin: 0}}>
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
              <span>Sports</span>
              <span className={styles.tag}>25</span>
              <div className="borderbotm"></div>
              <p>运动</p>
            </div>
            <div className={styles.li1Box + ' ' + "borderbefore"}>
              <span>Foot</span><span className={styles.tag}>5</span>
              <div className="borderbotm"></div>
              <p>美食</p>
            </div>
            <div className={styles.li1Box + ' ' + "borderbefore"}>
              <span>Travel</span><span className={styles.tag}>18</span>
              <div className="borderbotm"></div>
              <p>旅行</p>
            </div>
          </div>
          <div className="content-li li2">
            <h3>
              <span>生活精彩瞬间</span>
              <div className="borderbotm"></div>
              <span>02</span>
            </h3>
            <div className={styles.li2Box}>
              <a className={styles.li2BoxItem  + ' ' +  "carbox"}>
                <img src="./img/pic1.jpg" alt="" />
                <div className={styles.boxitemTitle}>
                  <h6>精彩瞬间</h6>
                  <span>地点：山西 晋城</span>
                </div>
              </a>
              <a className={styles.li2BoxItem  + ' ' +  "carbox"} href="https://gitee.com/wttAndroid/book_admin">
                <img src="./img/pic3.jpg" alt="" />
                <div className={styles.boxitemTitle}>
                  <h6>精彩瞬间</h6>
                  <span>地点：山西 晋城</span>
                </div>
              </a>
              <a className={styles.li2BoxItem  + ' ' +  "carbox"} href="https://wttandroid.gitee.io/wttandroid.github.io/">
                <img src="./img/timg2.gif" alt="" />
                <div className={styles.boxitemTitle}>
                  <h6>河南 影视城</h6>
                  <span>地点：河南 影视城</span>
                </div>
              </a>
              <a className={styles.li2BoxItem  + ' ' +  "carbox"} href="https://gitee.com/wttAndroid/xyy_server">
                <img src="./img/box4.gif" alt="" />
                <div className={styles.boxitemTitle}>
                  <h6>洛阳牡丹</h6>
                  <span>地点：洛阳 牡丹园</span>
                </div>
              </a>
            </div>
          </div>
          <div className="borderbotm"></div>
          <div className="carbox copybottm">
            ©2022 wttandroid
          </div>
        </div>
      </div>
    </div>
  )
}
