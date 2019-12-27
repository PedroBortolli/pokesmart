import React, { useState } from 'react'
import styled from 'styled-components'
import { mapping } from '../utils'

const colors = ['#1b5cbf', '#2c64b8', '#4976ba', '#6587ba', '#7d96bd', '#93a4bf', '#97a5b8']

const Sorter = ({ width, sort }) => {
    const [operator, setOperator] = useState('>')
    const [stats, setStats] = useState({ 'HP': null, 'Atk': null, 'Def': null, 'SpAtk': null, 'SpDef': null, 'Speed': null, 'Total': null })

    const changeOrder = (stat) => {
        let newOrder = 0
        Object.keys(stats).forEach(st => newOrder = Math.max(newOrder, stats[st]))
        if (!stats[stat]) {
            if (operator === '>') newOrder = Math.min(newOrder + 1, 7)
            else newOrder = Math.max(1, newOrder)
            setStats({...stats, [stat]: stats[stat] ? null : newOrder})
        }
        else {
            let hasEqualOrder = false
            Object.keys(stats).forEach(st => {
                if (st !== stat) {
                    newOrder = Math.max(newOrder, stats[st])
                    if (stats[st] === stats[stat]) hasEqualOrder = true
                }
            })
            
            setStats(Object.keys(stats).reduce((prev, st) => {
                if (st !== stat && stats[st] > stats[stat]) return {...prev, [st]: stats[st] - (hasEqualOrder ? 0 : 1)}
                else if (st !== stat) return {...prev, [st]: stats[st]}
                return {...prev, [st]: null}
            }, {}))
        }
    }

    const resetStats = () => {
        const st = { 'HP': null, 'Atk': null, 'Def': null, 'SpAtk': null, 'SpDef': null, 'Speed': null, 'Total': null }
        setStats(st)
        sort(st)
    }

    return (
        <div>
            <Buttons width={width}>
                {['HP', 'Atk', 'Def', 'SpAtk', 'SpDef', 'Speed', 'Total'].map(stat => {
                    return (
                        <div key={stat} style={{backgroundColor: colors[stats[stat] - 1]}} onClick={() => changeOrder(stat)}>
                            <span>{width < 720 ? mapping[stat].mobileLabel : stat}</span>
                            {stats[stat] &&
                                <Circle width={width}>
                                    <span style={{color: colors[stats[stat] - 1]}}>{stats[stat]}</span>
                                </Circle>
                            }
                        </div>
                    )
                })}
            </Buttons>
            <Modes width={width}>
                {['>', '='].map(mode => {
                    const selected = operator === mode
                    const customStyle = {opacity: selected ? 1 : 0.5, fontWeight: selected ? 900 : 400}
                    return (
                        <span key={mode} onClick={() => setOperator(mode)} style={customStyle}>{mode}</span>
                    )
                })}
                <span onClick={resetStats}>reset</span>
                <span onClick={() => sort(stats)}>Sort</span>
            </Modes>
        </div>
    )
}

export default Sorter

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 24px;
    user-select: none;
    > div {
        margin: 0px 4px 0px 4px;
        background-color: #adadad;
        width: ${props => props.width < 720 ? '38px' : '60px'};
        height: ${props => props.width < 720 ? '32px': '44px'};
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        :nth-child(1) { margin-left: 0px }
        :nth-child(7) { margin-right: 0px }
        font-size: ${props => props.width < 720 ? '12px' : '16px'};
        border-radius: 6px;
        cursor: pointer;
        opacity: 0.8;
    }
`
const Modes = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 12px;
    user-select: none;
    > span {
        width: 26px;
        height: 26px;
        background-color: #1a008f;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        cursor: pointer;
        margin: 1px 4px 0px 4px;
        :nth-child(3) {
            font-size: ${props => props.width < 720 ? '14px': '15px'};
            margin: 0px 32px 0px 32px;
            background-color: transparent;
            width: auto;
            height: auto;
            :hover {
                font-weight: 900;
                text-decoration: underline;
            }
        }
        :nth-child(4) {
            width: 64px;
            font-size: 16px;
        }
    }
`
const Circle = styled.div`
    width: ${props => props.width < 720 ? '14px' : '16px'};
    height: ${props => props.width < 720 ? '14px' : '16px'};
    border-radius: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d7d7d9;
    > span {
        font-size: ${props => props.width < 720 ? '12px' : '14px'}
    }
`