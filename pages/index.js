import { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'
import { getProfile, getBlogList, getVisitCount, updateVisitCount, getProjectList, getTechList, getNoteList } from './api/request'
import Head from 'next/head'
import dayjs from 'dayjs'
import styles from '../styles/home.module.css'
import Link from 'next/link'

export default function Home({ profileInfo, blogs, blogLasted, projects, hotProjects, techs, notes }) {
  console.log(hotProjects)
  profileInfo = profileInfo.attributes
  const mycardRef = useRef("")
  const lreanRef = useRef("")
  const textRef = useRef("")
  let [state, setState] = useState()

  useEffect(() => {
    let navigation = document.querySelector('.navigation')
    let mycard = document.querySelector('#mycard')

    if (state && state === true) {
      navigation.classList.remove('active')
    } else {
      navigation.classList.add('active')
    }
    let mycardTop = mycardRef && getTop(mycardRef.current) - mycardRef.current.clientHeight / 2 - 35
    window.onscroll = function () {
      var e = e || window.event;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > mycardTop) {
        mycard.classList.add('scroll')
      } else {
        mycard.classList.remove('scroll')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])


  useEffect(() => {

    const typed = new Typed(textRef.current, {
      strings: [
        'Frontend Lreaner',
        "CQUPT Student",
      ],
      typeSpeed: 150,
      backSpeed: 150,
      backDelay: 1200,
      loop: true
    })

    // Destroying
    return () => {
      typed.destroy();
    };
  }, []);


  const getTop = (e) => {  // e:dom元素
    var offset = e.offsetTop;
    if (e.offsetParent != null) offset += getTop(e.offsetParent);
    return offset;
  }

  const goToLrean = () => {
    const scrollHeight = getTop(lreanRef.current) - 70
    console.log(scrollHeight)
    window.scrollTo({
      top: scrollHeight,
      behavior: "smooth"
    })
  }


  return (
    <>
      <div className="box">
        <Head>
          <title>主页</title>
        </Head>
        {/* <Nav /> */}
        <div className="navigation" >
          {/* <img src=" ./banner.png" alt=""/> */}
          <div className="nav-titleBox co zz">
            {/* <!-- 占位符 --> */}
            <div className="co-left"></div>
            {/* <!-- 标题 --> */}
            <div className="co-right ">
              {/* <span className="titleBox-tag">HI MY NEW FRIEND!</span> */}
              <h3>Hello, It’s Me</h3>
              <h1>Call Me {profileInfo.nickname}</h1>
              <h3><span>And I’m a</span> <i ref={textRef}></i></h3>
              {/* href="#next-one" */}
              <i className="buttom navbtn" onClick={goToLrean}> 了解一下
              </i>
            </div>
          </div>
        </div>
        <div className="container content zz" ref={lreanRef}>
          <div className="co-left">
            {/* <!-- 简历吸盘 --> */}
            <div className="me-card carbox borderbefore" ref={mycardRef} id="mycard">
              <div className="mecar-title">
                <div className="me-image">
                  <span className="status">
                    <i>努力!!!</i>
                  </span>
                  <img src="./avatar.jpg" alt="" />
                </div>
                <h3>{profileInfo.name}</h3>
                <p className="me-hover">
                  <span>{profileInfo.introduction}</span>
                </p>
              </div>
              <div className="borderbotm"></div>
              <div className="lianxi-list">
                <a title={`wx:${profileInfo.weixin}`}>
                  <svg t="1649145899448" className="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="14861" width="15" height="15">
                    <path
                      d="M506.942 345.921c25.259 0 42.134-16.916 42.134-42.107 0-25.477-16.848-41.956-42.134-41.956-25.299 0-50.668 16.48-50.668 41.956 0.028 25.204 25.409 42.107 50.668 42.107l0 0zM506.942 345.921zM271.257 261.857c-25.259 0-50.79 16.48-50.79 41.956 0 25.19 25.532 42.107 50.79 42.107 25.163 0 42.012-16.916 42.012-42.107-0.014-25.477-16.834-41.956-42.012-41.956l0 0zM271.257 261.857zM1010.654 615.492c0-133.202-123.563-246.702-275.237-258.512 0.205-1.652 0.301-3.373-0.068-5.092-30.406-141.79-182.886-248.695-354.7-248.695-194.15 0-352.119 135.387-352.119 301.793 0 89.279 45.574 169.725 131.946 233.158l-30.106 90.508c-1.939 5.885-0.177 12.37 4.506 16.452 2.853 2.458 6.445 3.741 10.076 3.741 2.335 0 4.697-0.546 6.867-1.625l113.036-56.565 13.926 2.827c34.802 7.154 64.853 13.353 101.868 13.353 10.895 0 40.878-3.987 43.404-7.182 40.755 101.99 153.094 175.61 285.273 175.61 33.86 0 68.13-8.164 98.891-15.866l87.136 47.636c2.307 1.257 4.847 1.911 7.359 1.911 3.441 0 6.881-1.161 9.639-3.413 4.847-3.932 6.841-10.404 5.038-16.33l-22.255-74.001c74.602-58.955 115.521-129.488 115.521-199.708l0 0zM409.798 665.75c-9.626 0.833-19.388 1.243-29.082 1.243-32.686 0-60.334-5.652-92.31-12.26l-18.582-3.755c-3.195-0.683-6.567-0.245-9.503 1.269l-81.687 40.892 21.231-63.775c2.076-6.24-0.205-13.053-5.57-16.821-82.07-57.207-123.659-126.894-123.659-207.093 0-144.179 139.087-261.516 310.067-261.516 151.142 0 284.959 91.955 312.579 214.261-158.475 2.076-286.706 113.487-286.706 250.32 0 19.893 3.018 39.171 8.11 57.767-1.542-0.382-3.168-0.683-4.887-0.532l0 0zM860.371 788.699c-4.875 3.673-6.935 10.007-5.188 15.852l13.804 45.903-56.647-30.993c-2.157-1.188-4.588-1.803-7.004-1.803-1.188 0-2.389 0.15-3.564 0.464-30.379 7.674-61.822 15.593-92.433 15.593-142.186 0-257.857-97.717-257.857-217.811 0-120.095 115.658-217.771 257.857-217.771 139.469 0 257.325 99.724 257.325 217.771 0 59.87-37.738 121.255-106.291 172.797l0 0zM868.181 797.178zM616.454 506.006c-16.848 0-33.696 16.971-33.696 33.792 0 16.944 16.848 33.669 33.696 33.669 25.313 0 42.038-16.725 42.038-33.669 0-16.848-16.725-33.792-42.038-33.792l0 0zM616.454 506.006zM801.58 506.006c-16.603 0-33.451 16.971-33.451 33.792 0 16.944 16.848 33.669 33.451 33.669 25.231 0 42.257-16.725 42.257-33.669 0-16.848-16.998-33.792-42.257-33.792l0 0zM801.58 506.006z"
                      p-id="14862"></path>
                  </svg>
                </a>
                <a title="github:ruhangs" href="https://github.com/Ruhangs">
                  <svg t="1649145950732" className="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="16367" width="15" height="15">
                    <path
                      d="M695.765333 981.333333h-276.053333c-26.794667 0-47.317333-21.077333-47.317333-48.64V739.84c0-29.184 6.314667-56.746667 17.365333-81.066667-129.365333-48.64-214.528-150.784-214.528-264.277333 0-53.504 17.365333-103.765333 50.474667-147.498667-12.629333-42.154667-15.786667-95.658667-12.629334-157.269333C216.234667 62.122667 236.8 42.666667 261.973333 42.666667c14.208 0 134.101333 1.621333 203.52 64.853333a504.448 504.448 0 0 1 184.533334 0C717.866667 44.288 837.717333 42.666667 853.504 42.666667c25.216 0 45.738667 19.456 47.317333 45.397333 4.693333 61.610667 0 115.114667-12.629333 157.269333C921.301333 290.688 938.666667 340.906667 938.666667 392.832c0 113.493333-85.162667 215.637333-214.528 264.277333a207.786667 207.786667 0 0 1 17.365333 81.066667v192.896c1.578667 27.562667-20.48 50.261333-45.738667 50.261333z m-228.693333-97.28h181.333333V739.84c0-27.562667-12.586667-53.504-33.109333-71.338667-14.165333-11.349333-20.48-30.805333-15.786667-50.261333 4.778667-17.834667 18.944-32.426667 36.309334-35.669333 123.050667-24.32 208.213333-102.144 208.213333-189.696 0-47.018667-25.258667-82.688-45.738667-105.386667-14.208-14.549333-17.365333-35.626667-7.893333-55.082667 6.314667-12.970667 15.786667-40.533333 15.786667-89.173333-39.466667 6.485333-85.205333 19.456-102.528 45.397333-11.093333 16.213333-31.573333 24.32-50.474667 19.456a393.045333 393.045333 0 0 0-194.005333 0c-18.944 4.864-37.888-3.242667-50.474667-19.456-17.365333-25.941333-63.146667-38.912-102.528-45.397333 1.578667 48.64 9.429333 76.202667 15.786667 89.173333 7.850667 17.834667 4.693333 40.533333-7.936 55.082667-20.48 22.698667-45.738667 58.368-45.738667 105.386667 0 87.552 85.205333 163.754667 208.213333 189.696 17.365333 3.242667 31.573333 17.834667 36.266667 35.669333 4.736 17.834667-1.578667 37.290667-15.786667 50.261333a95.104 95.104 0 0 0-33.109333 71.296v144.298667h3.157333z"
                      fill="#172B4D" p-id="16368"></path>
                    <path
                      d="M403.968 788.394667c-212.949333 0-309.162667-194.56-313.898667-202.666667-11.050667-24.32-1.578667-53.461333 20.48-64.810667 23.68-11.349333 52.053333-1.621333 63.146667 21.077334 3.114667 6.485333 80.426667 157.269333 241.28 149.162666 26.837333-1.621333 48.896 19.456 48.896 46.976 1.578667 27.562667-18.901333 50.261333-45.738667 50.261334h-14.165333z"
                      fill="#172B4D" p-id="16369"></path>
                  </svg>
                </a>
                <a title={`email:${profileInfo.email}`} href={`Mailto:${profileInfo.email}?Subject=邮箱标题&amp;Body=邮箱内容！`}>
                  <svg t="1649145973361" className="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="17271" width="15" height="15">
                    <path
                      d="M983.899806 785.385782V224.886223h0.180631l-0.180631-4.696419c-0.180632-5.238314-0.722526-10.476627-1.806315-15.714941-2.890104-25.469042-21.675781-44.977245-45.519139-47.686717H122.287529c-11.741048 0-23.482096 1.625684-34.861881 5.238314-30.346093 10.295996-50.757453 40.100194-50.576821 74.058917v534.849885c-0.361263 21.314518 5.780208 42.087141 17.701887 59.789028l0.361263 0.722526 5.418946 3.973893c18.243782 21.856412 44.977245 34.319986 73.517022 34.500618H904.421944c37.751984 0 70.265655-27.094726 79.477862-66.291763l0.180631-0.541894c0.361263-5.96084 0.361263-11.741048-0.180631-17.701888zM390.16405 547.494091l55.453872 49.854295 43.893456 40.100194c5.418945 5.96084 13.005468 9.57347 21.133886 9.57347 7.947786 0 15.534309-3.431999 21.133886-9.57347l101.153642-91.941436 272.753572 263.721997H126.622685L390.16405 547.494091z m120.119951 30.346092L111.449638 216.03528H115.604163c214.409596-0.903158 703.559711-2.890104 793.875463-0.361263l-399.195625 362.166166z m165.458458-69.72376l251.619686-227.956959v474.518963L675.742459 508.116423z m-328.568707 0.180631L93.205856 760.278003V278.895043l253.967896 229.402011z"
                      p-id="17272"></path>
                  </svg>
                </a>
                <a title={`QQ:${profileInfo.qq}`}>
                  <svg t="1649146096754" className="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="18277" width="15" height="15">
                    <path
                      d="M537.576602 0c345.434577 0 362.285044 329.787714 362.285044 329.787714 52.356809 69.207276 24.072096 131.794725 24.072096 131.794725 168.504671 264.793055 59.578437 341.22196 29.488318 346.638181-29.488318 5.416222-58.374833-32.49733-58.374833-32.49733s-9.628838 37.913551-33.700934 58.374833c87.86315 40.922563 72.216288 92.075767 72.216288 92.075767s-18.655874 154.061414-383.94993 56.569425l-31.293725-5.416222c-350.248996 126.378504-393.578768-43.931575-393.578768-43.931575s-14.443258-71.012683 53.560413-97.491989c-39.718958-24.072096-53.560413-75.2253-53.560413-75.2253s-35.506341 57.77303-81.845126 36.709946C-3.443754 775.723291-31.728467 587.359141 143.997834 451.351799c0 0-25.275701-80.641521 32.49733-128.785713C176.495163 322.566085 192.142025 0 537.576602 0L537.576602 0 537.576602 0zM230.055576 341.22196C153.626672 406.216619 204.779876 471.211278 204.779876 471.211278 36.275204 574.72129 66.365324 742.022357 66.365324 742.022357s27.081108-13.239653 45.736982-52.356809c19.257677-39.117156 48.745994 6.619826 48.745994 6.619826s18.655874 89.066755 74.623497 123.971294c56.569425 34.904539-2.40721 57.171228-2.40721 57.171228s-61.985647 0.601802-56.569425 43.329773c5.416222 42.126168 205.81642 95.084779 325.575097 1.203605l63.791054 8.425234c209.427235 72.81809 312.937247 4.814419 319.557073-8.425234 6.619826-13.239653-31.895527-38.515353-67.401869-53.560413-35.506341-15.04506-44.533377-30.691922-13.239653-51.153204 31.293725-21.063084 43.931575-62.587449 61.985647-105.31542 18.054072-42.72797 45.736982-21.664886 49.347797-9.628838 3.610814 12.036048 29.488318 52.356809 29.488318 52.356809s68.003671-72.216288-73.419893-285.856139c0 0 30.691922-63.791054-21.063084-116.147863 0 0-12.63785-300.299397-320.158876-300.299397C224.639355 52.356809 230.055576 341.22196 230.055576 341.22196L230.055576 341.22196 230.055576 341.22196z"
                      p-id="18278"></path>
                  </svg>
                </a>
              </div>
              <div className="borderbotm"></div>
              <div className="mecar-bottm">
                <div>
                  <span className="mecarbottm-key">毕业院校</span>
                  <span className="mecarbottm-value">{profileInfo.university}</span>
                </div>
                <div>
                  <span className="mecarbottm-key">所在城市</span>
                  <span className="mecarbottm-value">{profileInfo.hometown}</span>
                </div>
                <div>
                  <span className="mecarbottm-key">年级</span>
                  <span className="mecarbottm-value">{profileInfo.grade}</span>
                </div>

              </div>
              <div className="borderbotm"></div>
              <div className="buttom-box ">
                <a className="button" href={`Mailto:${profileInfo.email}?Subject=邮箱标题&amp;Body=邮箱内容！`}>联系我</a>
              </div>
            </div>
          </div>
          {/* <!-- 右边 --> */}
          <div className="co-right" id="lrean"  >
            <div className={"content-li" + " " + "li1" + " " + styles.li1Layout}>
              <div className={styles.li1Box + ' ' + 'borderbefore'}>
                <span>{blogs.length}</span>
                <div className="borderbotm"></div>
                <p>文   章</p>
              </div>
              <div className={styles.li1Box + ' ' + 'borderbefore'}>
                <span>{projects.length}</span>
                <div className="borderbotm"></div>
                <p>项   目</p>
              </div>
              <div className={styles.li1Box + ' ' + 'borderbefore'}>
                <span>{notes.length}</span>
                <div className="borderbotm"></div>
                <p>笔 记</p>
              </div>
            </div>

            <div className="content-li li4" >
              <h3>
                <span>技术栈</span>
                <div className="borderbotm"></div>
                <span>01</span>
              </h3>
              <div className={styles.li4Box}>
                <div className="carbox" >
                  <svg t="1649230380175" className="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2002" width="40" height="40">
                    <path
                      d="M738.304 689.664h-59.392v-40.96h59.392c89.6 0 162.816-74.24 162.816-164.864 0-91.136-73.216-164.864-162.816-164.864-9.216 0-18.944 1.024-28.16 2.56l-21.504 3.584-2.048-22.016C677.376 211.968 602.112 143.36 512 143.36c-90.624 0-165.888 68.608-175.104 159.744l-2.048 22.016-21.504-3.584c-9.216-1.536-18.432-2.56-28.16-2.56-89.6 0-162.816 74.24-162.816 164.864 0 91.136 73.216 164.864 162.816 164.864h59.904v40.96H285.184c-112.128 0-203.776-92.672-203.776-205.824s91.136-205.824 203.776-205.824c4.608 0 9.728 0 14.336 0.512C319.488 176.64 407.04 102.4 511.488 102.4c104.96 0 192.512 74.24 212.48 175.616 4.608-0.512 9.216-0.512 14.336-0.512 112.128 0 203.776 92.672 203.776 205.824s-91.136 206.336-203.776 206.336z"
                      fill="#333333" p-id="2003"></path>
                    <path d="M574.464 679.936L512 617.984l-62.464 61.952-28.672-28.672 91.136-91.648 91.136 91.648z"
                      fill="#EB4446" p-id="2004"></path>
                    <path d="M491.52 614.4h40.96v171.52h-40.96z" fill="#EB4446" p-id="2005"></path>
                    <path
                      d="M512 928.768c-3.584 0-7.68-1.024-10.752-3.072l-187.392-119.296c-6.144-3.584-9.728-10.24-9.728-17.408v-239.104c0-7.168 3.584-13.312 9.728-17.408l187.392-119.296c6.656-4.096 15.36-4.096 22.016 0l187.392 119.296c6.144 3.584 9.728 10.24 9.728 17.408V788.48c0 7.168-3.584 13.312-9.728 17.408l-187.392 119.296c-3.584 2.56-7.68 3.584-11.264 3.584z m-166.912-151.552l166.912 106.496 166.912-106.496v-216.576L512 454.656l-166.912 106.496v216.064z m354.304 11.264z"
                      fill="#333333" p-id="2006"></path>
                    <path
                      d="M675.84 675.84H286.72V409.6c0-33.792 27.648-61.44 61.44-61.44h389.12v266.24c0 33.792-27.648 61.44-61.44 61.44z"
                      fill="#333333" opacity=".18" p-id="2007"></path>
                  </svg>
                  <h4>前端</h4>
                  {
                    techs.map((tech) => (
                      <p key={tech.id}>
                        {
                          tech.attributes.type === 'frontend' ? <span>{tech.attributes.name} <i>{tech.attributes.desc}</i></span> : null
                        }
                      </p>
                    ))
                  }
                  <a>ORDER NOW</a>
                </div>
                <div className="carbox" >
                  <svg t="1649230391217" className="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2160" width="40" height="40">
                    <path
                      d="M512 942.08c-99.328 0-174.08-184.832-174.08-430.08s74.752-430.08 174.08-430.08 174.08 184.832 174.08 430.08-74.752 430.08-174.08 430.08z m0-819.2c-62.976 0-133.12 159.744-133.12 389.12s70.144 389.12 133.12 389.12 133.12-159.744 133.12-389.12-70.144-389.12-133.12-389.12z"
                      fill="#333333" p-id="2161"></path>
                    <path d="M102.4 491.52h814.592v40.96H102.4z" fill="#EB4446" p-id="2162"></path>
                    <path
                      d="M512 942.08c-85.504 0-167.936-25.088-239.104-72.192l22.528-33.792C359.936 878.592 434.688 901.12 512 901.12c214.528 0 389.12-174.592 389.12-389.12s-174.592-389.12-389.12-389.12-389.12 174.592-389.12 389.12c0 82.944 25.6 161.792 74.24 228.864l-33.28 24.064C110.08 691.2 81.92 603.648 81.92 512c0-237.056 193.024-430.08 430.08-430.08s430.08 193.024 430.08 430.08-193.024 430.08-430.08 430.08z"
                      fill="#333333" p-id="2163"></path>
                    <path
                      d="M860.16 793.6H419.84V496.64c0-33.792 27.648-61.44 61.44-61.44h440.32v296.96c0 33.792-27.648 61.44-61.44 61.44z"
                      fill="#333333" opacity=".18" p-id="2164"></path>
                  </svg>
                  <h4>后端</h4>
                  {
                    techs.map((tech) => (
                      <p key={tech.id}>
                        {
                          tech.attributes.type === 'backend' ? <span>{tech.attributes.name} <i>{tech.attributes.desc}</i></span> : null
                        }
                      </p>
                    ))
                  }
                  <a>ORDER NOW</a>
                </div>
              </div>
            </div>
            <div className="content-li li6">
              <h3>
                <span>最新项目
                </span>
                <div className="borderbotm"></div>
                <span>02</span>
              </h3>
              <div className={styles.li6Box}>
                {
                  hotProjects.map((project) => (
                    <div className=" carbox" key={project.id}>
                      <a className={styles.imgbox} href={project.attributes.address}>
                        <img src={`./img/project/${project.attributes.cover}.png`} alt="" />
                      </a>
                      <div className={styles.li6carTitle}>
                        {`${project.attributes.name}：${project.attributes.abstract}`}
                        <br />{dayjs(project.attributes.updatedAt).format("YYYY.MM.DD")}
                        <div className="borderbotm"></div>
                        <a href={project.attributes.address}>进入浏览</a>
                      </div>
                    </div>
                  ))
                }

              </div>
            </div>
            <div className="content-li li3">
              <h3>
                <span>近期文章</span>
                <div className="borderbotm"></div>
                <span>03</span>
              </h3>
              {
                blogLasted.map((blog) => {
                  return (
                    <Link className={`carbox ${styles.li3Box}`} key={blog.id} href={`Blog/detail/${blog.id}`}>
                      <h3 style={{ margin: "auto" }}>{blog.attributes.title}</h3>
                      <p>摘要：{blog.attributes.abstract}
                      </p>
                      <div className={styles.addressWrap}>
                        <div className={styles.addressLeft}>
                          <span>{blog.attributes.group === 'work' ? "工作" : blog.attributes.group === 'study' ? "学习" : "生活"} </span>
                        </div>
                        <div className={styles.addressRight}>
                          {/* 点赞功能 */}
                          {/* <span>
                            <svg t="1663167559418" className="icon" viewBox="0 0 1024 1024" version="1.1"
                              xmlns="http://www.w3.org/2000/svg" p-id="8282" width="20" height="20">
                              <path
                                d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                                p-id="8283"></path>
                            </svg>
                            1
                          </span> */}

                          <svg t="1663149212139" className="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1979" width="20" height="20">
                            <path
                              d="M192 512a320 320 0 1 1 640 0 320 320 0 0 1-640 0zM512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z m21.333333 224a32 32 0 0 0-64 0V554.666667h202.666667a32 32 0 0 0 0-64H533.333333V352z"
                              fill="#222222" p-id="1980"></path>
                          </svg>
                          <span>{dayjs(blog.attributes.publishedAt).format('YYYY-MM-DD hh:mm:ss')}</span>
                        </div>
                      </div>
                    </Link>
                  )
                })

              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export async function getStaticProps() {
  const profileInfo = await getProfile().then((res) => {
    return res.data
  })
  const blogs = await getBlogList().then((res) => {
    return res.data
  })

  const blogLasted = blogs.sort((a, b) => {
    return a.attributes.updatedAt - b.attributes.updatedAt
  }).slice(0, 4);

  const projects = await getProjectList().then((res) => {
    return res.data
  })

  const hotProjects = projects.sort((a, b) => {
    return b.attributes.updatedAt - a.attributes.updatedAt
  }).slice(0,2)

  const techs = await getTechList().then((res) => {
    return res.data
  })

  const notes = await getNoteList().then((res) => {
    return res.data
  })

  // const visitCount = await getVisitCount().then((res) => {
  //   return res.data.attributes.count
  // })

  // updateVisitCount({ count: Number(visitCount) + 1 }).then((res, req) => {
  //   console.log("success")
  // }).catch(() => {
  //   console.log("fail")
  // })



  return {
    props: {
      profileInfo,
      blogs,
      blogLasted,
      projects,
      hotProjects,
      techs,
      notes
    }
  }
}