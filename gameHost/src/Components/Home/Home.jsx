import React from 'react'
import Sample from '../Sample/Sample'
import Working from '../Working/Working'
import Format from '../Format/Format'
import Guide from '../Guide/Guide'
import './Home.css'
import { formatData } from '../data'
import Footer from '../Footer/Footer'

export default function Home() {
  return (
    <div className='home-container'>
      <Sample />
      <Working />
      <Format data={formatData[0]} />
      <Guide />
      <Format className="sec-format" data={formatData[1]} />
      <Footer />
    </div>
  )
}
