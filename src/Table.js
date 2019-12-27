import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { pokemons } from './db'
import { columns, mapping } from './utils'
import useScreenSize from './hooks/useScreenSize'
import Type from './components/type'
import TypesAdv from './components/str_weak'
import Sorter from './components/sorter'

const Pokemon = ({ width, expand, pokemon, toggle, lastUpdated }) => {
    return useMemo(() => {
        return (
            <Row width={width} expand={expand} onClick={() => toggle(pokemon.ID)}>
                {columns.map(column => <Item key={`${pokemon.Name}-${column.value}`}>{pokemon[column.value]}</Item>)}
                {expand && (
                    <Info width={width}>
                        <Types width={width}>
                            {width >= 720 && <div style={{marginBottom: 8}}>{pokemon.Name}</div>}
                            <Type type={pokemon.Type1} />
                            {pokemon.Type2 && pokemon.Type1 !== pokemon.Type2 && <Type type={pokemon.Type2} />}
                        </Types>
                        <TypesAdv pokemon={pokemon} width={width} />
                    </Info>
                )}
            </Row>
        )
    }, [width, expand, lastUpdated])
}

const Table = () => {
    const [name, setName] = useState('')
    const [pokemonInfo, setPokemonInfo] = useState(null)
    const [mons, setMons] = useState([])
    const [width] = useScreenSize()
    const [lastUpdated, setLastUpdated] = useState(+ new Date())
    useEffect(() => setMons(pokemons, []))

    const togglePokemon = (id) => {
        if (!pokemonInfo || pokemonInfo !== id) setPokemonInfo(id)
        else setPokemonInfo(null)
    }

    const sort = (stats) => {
        const priorities = [[], [], [], [], [], [], [], []]
        Object.keys(stats).forEach(stat => {
            if (stats[stat]) priorities[stats[stat] - 1].push(stat)
        })
        if (!priorities[0].length) priorities[0].push('ID')
        const compare = (a, b) => {
            let ret = 0
            priorities.some(priority => {
                if (priority.length > 0) {
                    const totalA = priority.reduce((total, stat) => {
                        return total + a[mapping[stat].value]
                    }, 0)
                    const totalB = priority.reduce((total, stat) => {
                        return total + b[mapping[stat].value]
                    }, 0)
                    if (totalA < totalB) ret = 1
                    else if (totalA > totalB) ret = -1
                    if (priority[0] === 'ID') ret *= -1
                }
                if (ret) return ret
            })
            return ret || 0
        }
        const test = pokemons.sort((a, b) => compare(a, b))
        setMons(test)
        setLastUpdated(+ new Date())
    }

    return (
        <Container>
            <Sticky>
                <Input value={name} onChange={e => setName(e.target.value.toLowerCase())} placeholder="Search for a pokémon" />
                <Sorter width={width} sort={sort} />
            </Sticky>

            <TableContainer>
                <Row width={width}>
                    {columns.map(column => <Item key={column.value}>{width < 720 ? column.mobileLabel : column.desktopLabel}</Item>)}
                </Row>
                {(mons || pokemons).map(pokemon => {
                    const expand = pokemonInfo === pokemon.ID
                    return (
                        pokemon.Name.toLowerCase().includes(name) &&
                        <Pokemon key={pokemon.Name} width={width} expand={expand} pokemon={pokemon} toggle={togglePokemon} lastUpdated={lastUpdated} />
                    )
                })}
            </TableContainer>
        </Container>
    )
}

export default Table

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
`
const TableContainer = styled.div`
    border: 2px solid #6d7075;
    border-radius: 8px;
    margin: 8px 12px 0px 12px;
`
const mobileGrid = '30px 100px 27px 27px 27px 27px 27px 27px 44px'
const desktopGrid = '50px 180px 64px 64px 64px 64px 64px 64px 72px'
const Row = styled.div`
    height: ${props => props.expand ? 'auto' : '50px'};
    display: grid;
    grid-template-columns: ${props => props.width < 720 ? mobileGrid : desktopGrid};
    font-size: ${props => props.width < 720 ? '13px' : '16px'};
    cursor: pointer;
    :not(:first-child):hover {
        background-color: #575757;
    }
    background-color: ${props => props.expand ? '#575757' : 'none'};
    padding: ${props => props.expand ? '8px 0px 12px' : '0px'};
    :first-child {
        border-bottom: 2px solid #6d7075;
        height: 40px;
        position: sticky;
        top: 180px;
        background-color: #4a4a4a;
    }
    > span:nth-child(9) {
        margin-left: 8px;
    }
`
const Item = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`
const Input = styled.input`
    width: 240px;
    background: #fff;
    color: #a3a3a3;
    font: inherit;
    border: 0;
    outline: 0;
    height: 28px;
    border-radius: 8px;
    padding: 6px 16px 6px 16px;
    font-size: 20px;
    text-align: center;
`
const Sticky = styled.div`
    position: sticky;
    top: 0px;
    height: 180px;
    background-color: #383838;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Info = styled.div`
    display: flex;
    justify-content: space-between;
    width: ${props => props.width < 720 ? '348px' : '654px'};
    height: auto;
    padding: ${props => props.width < 720 ? '0px 4px 0px 4px' : '0px 16px 0px 16px'};
    margin-top: 16px;
`
const Types = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -12px;
    > div {
        :not(:last-child) { margin-bottom: 4px }
        :first-child { 
            font-size: ${props => props.width < 720 ? '14px': '22px'};
        }
    }
`