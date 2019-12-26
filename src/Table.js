import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { pokemons } from './db'
import { columns } from './utils'
import useScreenSize from './hooks/useScreenSize'
import Type from './components/type';
import TypesAdv from './components/str_weak'

const Pokemon = ({ width, expand, pokemon, toggle }) => {
    return useMemo(() => {
        return (
            <Row width={width} expand={expand} key={pokemon.Name} onClick={() => toggle(pokemon.ID)}>
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
    }, [width, expand])
}

const Table = () => {
    const [name, setName] = useState('')
    const [pokemonInfo, setPokemonInfo] = useState(null)
    const [width] = useScreenSize()

    const togglePokemon = (id) => {
        if (!pokemonInfo || pokemonInfo !== id) setPokemonInfo(id)
        else setPokemonInfo(null)
    }

    return (
        <Container>
            <Sticky>
                <Input value={name} onChange={e => setName(e.target.value.toLowerCase())} placeholder="Search for a pokémon" />
            </Sticky>

            <TableContainer>
                <Row width={width}>
                    {columns.map(column => <Item key={column.value}>{width < 720 ? column.mobileLabel : column.desktopLabel}</Item>)}
                </Row>
                {pokemons.map(pokemon => {
                    const expand = pokemonInfo === pokemon.ID
                    return (
                        pokemon.Name.toLowerCase().includes(name) &&
                        <Pokemon width={width} expand={expand} pokemon={pokemon} toggle={togglePokemon} />
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
    
`
const TableContainer = styled.div`
    border: 2px solid #6d7075;
    border-radius: 8px;
    margin-top: 8px;
`
const mobileGrid = '34px 108px 28px 28px 28px 28px 28px 28px 46px'
const desktopGrid = '50px 180px 64px 64px 64px 64px 64px 64px 72px'
const Row = styled.div`
    height: ${props => props.expand ? 'auto' : '50px'};
    display: grid;
    grid-template-columns: ${props => props.width < 720 ? mobileGrid : desktopGrid};
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
        top: 80px;
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
    height: 80px;
    background-color: #383838;
    display: flex;
    justify-content: center;
    align-items: center;
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