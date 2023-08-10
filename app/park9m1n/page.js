'use client'

import axios, { all } from "axios";
import { useEffect, useState } from "react"

export default function Home() {

  const [cnt, setCnt] = useState(0)
  const [hydrated, setHydrated] = useState(false);
  const [sub, setSub] = useState(false)

  useEffect(() => {
      getData()
      setHydrated(true)
  }, [])

  if(!hydrated) {
    return null
  }


  async function notiAllow() {
      const reg = await navigator.serviceWorker.register('/noti.js')
      reg.waiting?.postMessage('SKIP_WAITING')

      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((subscription) => {
          if(subscription) {
            console.log(subscription.toJSON())
            setSub(true)
          } else {
          }
        })
      })
  }

  async function allowNoti() {
    const registration = await navigator.serviceWorker.getRegistration()
    
    registration.pushManager
      .subscribe({
        userVisibleOnly:true,
        applicationServerKey: process.env.NEXT_PUBLIC_PUBLIC_KEY
      })
      .then(async (subscription) => {
        const res = await axios.post('http://35.221.213.98:3001/api/sub/park9m1n', {
          data: subscription.toJSON()
        })
        console.log(res.status)
        setSub(true)
      })
  }

  async function getData(){
    const res = await axios.post('http://35.221.213.98:3001/api/getData', {
      id: "park9m1n"
    })
    if(res.status === 200)
    {
      setCnt(res.data.res)
      notiAllow()
    }
    else {
      //api 오류
    }
  }

  window.matchMedia(
    '(display-mode: standalone)'
  ).matches

  async function sting() {
    const res = await axios.post('http://35.221.213.98:3001/api/sting/park9m1n')
    if(res.status === 200)
    {
      setCnt(cnt + 1)
    }
    else {
      //api 오류
      window.alert('API 오류')
    }
    
  }

  return (
    <div className="background">
      <div className="title">콕 찔러버리기</div>
      {
        (sub) ? (
          <button className="Mainbtn" onClick={sting.bind()}> 👉 </button>
        ): (
          <div id="noti">
            <div>알림이 설정되지 않음</div>
            <button onClick={allowNoti.bind()}>알림 설정하기</button>
          </div>
        )
      }
      
      <div className="cnt">누적 {cnt}회</div>
    </div>
  )
}
