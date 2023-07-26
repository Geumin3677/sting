'use client'

import axios from "axios";
import { useEffect, useState } from "react"

export default function Home() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
      setHydrated(true)
  }, [])

  if(!hydrated) {
    return null
  }


  window.matchMedia(
    '(display-mode: standalone)'
  ).matches

  return (
    <div className="background">
    </div>
  )
}
