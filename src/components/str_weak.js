import React from 'react'
import styled from 'styled-components'
import Type from './type';

const types = {
    Normal: {
        immune: ['Ghost'],
        weaknesses: ['Rock', 'Steel'],
        strengths: []
    },
    Fire: {
        immune: [],
        weaknesses: ['Fire', 'Water', 'Rock', 'Dragon'],
        strengths: ['Grass', 'Ice', 'Bug', 'Steel']
    },
    Water: {
        immune: [],
        weaknesses: ['Water', 'Grass', 'Dragon'],
        strengths: ['Fire', 'Ground', 'Rock']
    },
    Electric: {
        immune: ['Ground'],
        weaknesses: ['Electric', 'Grass', 'Dragon'],
        strengths: ['Water', 'Flying']
    },
    Grass: {
        immune: [],
        weaknesses: ['Fire', 'Grass', 'Poison', 'Flying', 'Bug', 'Dragon', 'Steel'],
        strengths: ['Water', 'Ground', 'Rock']
    },
    Ice: {
        immune: [],
        weaknesses: ['Fire', 'Water', 'Ice', 'Steel'],
        strengths: ['Grass', 'Ground', 'Flying', 'Dragon']
    },
    Fighting: {
        immune: ['Ghost'],
        weaknesses: ['Poison', 'Flying', 'Psychic', 'Bug', 'Fairy'],
        strengths: ['Normal', 'Ice', 'Rock', 'Dark', 'Steel']
    },
    Poison: {
        immune: ['Steel'],
        weaknesses: ['Poison', 'Ground', 'Rock', 'Ghost'],
        strengths: ['Grass', 'Fairy']
    },
    Ground: {
        immune: ['Flying'],
        weaknesses: ['Grass', 'Bug'],
        strengths: ['Fire', 'Electric', 'Poison', 'Rock', 'Steel']
    },
    Flying: {
        immune: [],
        weaknesses: ['Electric', 'Rock', 'Steel'],
        strengths: ['Grass', 'Fighting', 'Bug']
    },
    Psychic: {
        immune: ['Dark'],
        weaknesses: ['Psychic', 'Steel'],
        strengths: ['Fighting', 'Poison']
    },
    Bug: {
        immune: [],
        weaknesses: ['Fire', 'Fighting', 'Poison', 'Flying', 'Ghost', 'Steel', 'Fairy'],
        strengths: ['Grass', 'Psychic', 'Dark']
    },
    Rock: {
        immune: [],
        weaknesses: ['Fighting', 'Ground', 'Steel'],
        strengths: ['Fire', 'Ice', 'Flying', 'Bug']
    },
    Ghost: {
        immune: [],
        weaknesses: ['Dark'],
        strengths: ['Psychic', 'Ghost']
    },
    Dragon: {
        immune: ['Fairy'],
        weaknesses: ['Steel'],
        strengths: ['Dragon']
    },
    Dark: {
        immune: [],
        weaknesses: ['Fighting', 'Dark', 'Fairy'],
        strengths: ['Psychic', 'Ghost']
    },
    Steel: {
        immune: [],
        weaknesses: ['Fire', 'Water', 'Electric', 'Steel'],
        strengths: ['Ice', 'Rock', 'Fairy']
    },
    Fairy: {
        immune: [],
        weaknesses: ['Fire', 'Poison', 'Steel'],
        strengths: ['Fighting', 'Dragon', 'Dark']
    }
}

const TypesAdv = ({ pokemon, width }) => {
    const type1 = pokemon.Type1
    const type2 = pokemon.Type2 ? (pokemon.Type2 !== pokemon.Type1 ? pokemon.Type2 : null) : null
    let multipliers = {}
    Object.keys(types).forEach(type => {
        multipliers = {...multipliers, [type]: 1}
        if (types[type].weaknesses.indexOf(type1) !== -1) multipliers[type] /= 2.0
        if (types[type].strengths.indexOf(type1) !== -1) multipliers[type] *= 2.0
        if (types[type].immune.indexOf(type1) !== -1) multipliers[type] = 0
        if (type2) {
            if (types[type].weaknesses.indexOf(type2) !== -1) multipliers[type] /= 2.0
            if (types[type].strengths.indexOf(type2) !== -1) multipliers[type] *= 2.0
            if (types[type].immune.indexOf(type2) !== -1) multipliers[type] = 0
        }
    })
    const immuneTo = Object.keys(multipliers).reduce((prev, cur) => {
        if (multipliers[cur] === 0) return [...prev, cur]
        else return prev
    }, [])
    const veryStrongTo = Object.keys(multipliers).reduce((prev, cur) => {
        if (multipliers[cur] === 0.25) return [...prev, cur]
        else return prev
    }, [])
    const strongTo = Object.keys(multipliers).reduce((prev, cur) => {
        if (multipliers[cur] === 0.5) return [...prev, cur]
        else return prev
    }, [])
    const weakTo = Object.keys(multipliers).reduce((prev, cur) => {
        if (multipliers[cur] === 2) return [...prev, cur]
        else return prev
    }, [])
    const veryWeakTo = Object.keys(multipliers).reduce((prev, cur) => {
        if (multipliers[cur] === 4) return [...prev, cur]
        else return prev
    }, [])
    const spanWidth = width < 720 ? (veryStrongTo.length > 0 ? '124px' : '98px') : (veryStrongTo.length > 0 ? '180px' : '150px')
    const gridRepeat = width < 720 ? 'repeat(3, 46px)' : 'repeat(7, 52px)'

    return (
        <Container spanWidth={spanWidth} width={width} gridRepeat={gridRepeat}>
            {veryWeakTo.length > 0 &&
                <Row>
                    <Grid>
                        {veryWeakTo.map(type => <Type tiny={width < 720} medium={width >= 720} type={type} />)}
                    </Grid>
                    <span style={{justifyContent: 'flex-end'}}>Very weak to&nbsp;<b>(4x)</b></span>
                </Row>
            }
            {weakTo.length > 0 &&
                <Row>
                    <Grid>
                        {weakTo.map(type => <Type tiny={width < 720} medium={width >= 720} type={type} />)}
                    </Grid>
                    <span style={{justifyContent: 'flex-end'}}>Weak to&nbsp;<b>(2x)</b></span>
                </Row>
            }
            {strongTo.length > 0 &&
                <Row>
                    <Grid>
                        {strongTo.map(type => <Type tiny={width < 720} medium={width >= 720} type={type} />)}
                    </Grid>
                    <span style={{justifyContent: 'flex-end'}}>Strong to&nbsp;<b>(0.5x)</b></span>
                </Row>
            }
            {veryStrongTo.length > 0 &&
                <Row>
                    <Grid>
                        {veryStrongTo.map(type => <Type tiny={width < 720} medium={width >= 720} type={type} />)}
                    </Grid>
                    <span style={{justifyContent: 'flex-end'}}>Very strong to&nbsp;<b>(0.25x)</b></span>
                </Row>
            }
        </Container>
    )
}

export default TypesAdv

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    > div > span {
        min-width: ${props => props.spanWidth};
        display: flex;
        flex-direction: flex-end;
        font-size: ${props => props.width < 720 ? '11px' : '16px'};
    }
    > div > div { grid-template-columns: ${props => props.gridRepeat} }
`
const Row = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    :not(:last-child) { margin-bottom: 16px }
`
const Grid = styled.div`
    display: grid;
    direction: rtl;
`