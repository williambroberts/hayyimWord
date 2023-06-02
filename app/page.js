"use client"
import Display from '@/components/display/display'
import Image from 'next/image'
import React, {Suspense, useState} from 'react'
import Loading from './loading'

export default function Home() {
  const [open,setOpen]=useState(false)
  return (
    <main className='home-main'>
     <Suspense fallback={<Loading/>}>
      <Display/>
     </Suspense>
     
    </main>
  )
}
