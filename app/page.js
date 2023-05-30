"use client"
import Display from '@/components/display/display'
import Image from 'next/image'
import React, {useState} from 'react'

export default function Home() {
  const [open,setOpen]=useState(false)
  return (
    <main>
      home🦜🏹
     <Display/>
    </main>
  )
}
