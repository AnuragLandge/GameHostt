import React from 'react'
import CardGrid from './CardGrid'
import { Typography } from '@mui/material'

export default function Format(props) {
  return (
    <div className={props.className ? `${props.className} sampleContainer` : 'sampleContainer'} style={{ paddingTop: "40px", height: "30px", width: "100%" }}>
      <div style={{ textAlign: 'center', paddingLeft: "30px" }}>
        <Typography variant='h6' sx={{}}>Format</Typography>
        <div className="Format-desc-container" style={{justifyContent:"center", width:"85%", alignItems:"center", margin:"auto"}}>

          <Typography>GameHost has a large number of tournament formats and settings that can handle anything from your Friday night game with friends to an ongoing tournament series or multi-day, world-class tournament with thousands of participants.</Typography>
        </div>
      </div>
      <CardGrid />
    </div>
  )
}
