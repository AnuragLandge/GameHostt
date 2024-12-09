import React from 'react'
import CardGrid from './CardGrid'

export default function Format() {
  return (
    <div className='sampleContainer' style={{paddingTop:"40px",height:"30px", width:"100%"}}>
        <div style={{textAlign: 'center', paddingLeft:"30px"}}>
        <h1 sx={{}}>Format</h1>
        </div>
        <CardGrid/>
    </div>
  )
}
