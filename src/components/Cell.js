import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import {BsFillFlagFill} from 'react-icons/bs'

const useStyles = createUseStyles({
    cellStyle: {
        height: 50,
        width: 50,
        backgroundColor: 'black',
        border: '1px solid red',
        '&:hover': { backgroundColor: "blue" },
    }
})

const Cell = ({ cell, clickCell, flag }) => {
    // const [isClicked, setIsClicked] = useState(false)
    // const [isFlagged, setIsFlagged] = useState(false)
    // useEffect(()=>{
    //     setIsClicked(cell.isClicked)
    //     setIsFlagged(cell.isFlagged)
    // },[cell.isClicked,cell.isFlagged])
    // const [isClicked, setIsClicked] = useState(false)
    const { cellStyle } = useStyles()
    // console.log(cell)
    return (
        <div className={cellStyle} style={{
            // height: 50,
            // width: 50,
            backgroundColor: cell.isClicked && 'green',
        }} onClick={()=>{
            clickCell(cell.x,cell.y)
        }} onContextMenu={(e)=>{
            flag(cell.x,cell.y,e)
        }}
        ><div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: cell.isFlagged && 'orange'
        }}>

            {cell.isFlagged&&<BsFillFlagFill size={25}/>}
            {cell.isClicked && <div>{cell.count}</div>}
        </div>
        </div>
    )
}

export default Cell