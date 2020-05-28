import React, { useState, useEffect } from 'react'
import Cell from './Cell'

const neighbors = [
    [1, 0],
    [1, 1],
    [1, -1],
    [0, 1],
    [0, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1]
]
const Board = () => {
    const [grid, setGrid] = useState([])
    const [rows, setRows] = useState(0)
    const [columns, setColumns] = useState(0)
    const [bombNumber, setBombNumber] = useState(0)
    useEffect(() => {
        generateBoard(10, 10, 25)
    }, [])
    const checkNeighbors = (x, y) => {
        let count = 0
        neighbors.forEach(([newX, newY]) => {
            if (x+newX>=0 && x+newX<rows && y+newY>=0 && y+newY<columns){
                if (grid[x+newX][y+newY].isBomb) {
                    count++
                }
            }

        })
        return count
    }
    const flag = (x, y, e) => {
        e.preventDefault()
        let newGrid = [...grid]
        newGrid[x][y].isFlagged = !newGrid[x][y].isFlagged
        setGrid(newGrid)
    }
    const clickCell = (x, y) => {
        let newGrid = [...grid]
        if (newGrid[x][y].isClicked) {
            return
        }
        if (newGrid[x][y].isBomb) {
            alert('you lose')
            generateBoard(10, 10, 25)
            return
        }
        const count = checkNeighbors(x,y)
        newGrid[x][y].count = count
        newGrid[x][y].isClicked = true
        if(count===0){
            neighbors.forEach(([newX, newY])=>{
                if (x+newX>=0 && x+newX<rows && y+newY>=0 && y+newY<columns){
                    clickCell(x+newX,y+newY)
                }
            })
        }

        setGrid(newGrid)
    }
    const generateBoard = async (rows, columns, bombNumber) => {
        setRows(rows)
        setColumns(columns)
        await generateGrid(rows, columns, bombNumber)
    }
    const generateGrid = (rows, columns, bombNumber) => {
        let genGrid = []
        for (let x = 0; x < rows; x++) {
            genGrid.push([])
            for (let y = 0; y < columns; y++) {
                genGrid[x].push({ x, y, isBomb: false, isClicked: false, count: 0, isFlagged : false})
            }
        }
        let newGrid = generateBombs(rows, columns, bombNumber, genGrid)
        setGrid(newGrid)
    }
    const generateBombs = (rows, columns, bombNumber, newGrid) => {
        for (let i = 0; i < bombNumber; i++) {
            const x = Math.floor(Math.random() * rows)
            const y = Math.floor(Math.random() * columns)
            console.log(i)
            if (newGrid[x][y].isBomb) {
                i--
            } else {
                newGrid[x][y].isBomb = true
            }
        }
        return newGrid
    }
    console.log(grid)
    return (
        <div style={{
            display: 'grid', gridTemplateRows: `repeat(${rows},1fr)`,
            gridTemplateColumns: `repeat(${columns},1fr)`,
            margin: 0, padding: 0, gridColumnGap: 0, gridRowGap: 0,
            height: `${columns * 12}`,
            width: `${rows * 12}`,
        }}>
            {grid.length > 0 && grid.map((rows) => {
                return <div>
                    {rows.map((cell) => {

                        return <div><Cell clickCell={clickCell} flag={flag} cell={cell} /></div>
                    })}
                </div>
            })}
        </div>
    )
}

export default Board