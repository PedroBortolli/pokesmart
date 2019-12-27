const columns = [
    { value: 'ID', desktopLabel: 'ID', mobileLabel: 'ID'},
    { value: 'Name', desktopLabel: 'Name', mobileLabel: 'Name'},
    { value: 'HP', desktopLabel: 'HP', mobileLabel: 'HP'},
    { value: 'Attack', desktopLabel: 'Atk', mobileLabel: 'A'},
    { value: 'Defense', desktopLabel: 'Def', mobileLabel: 'D'},
    { value: 'SpAtk', desktopLabel: 'SpAtk', mobileLabel: 'SA'},
    { value: 'SpDef', desktopLabel: 'SpDef', mobileLabel: 'SD'},
    { value: 'Speed', desktopLabel: 'Speed', mobileLabel: 'S'},
    { value: 'Total', desktopLabel: 'Total', mobileLabel: 'Tot'}
]

const mapping = {
    'HP': { value: 'HP', mobileLabel: 'HP' },
    'Atk': { value: 'Attack', mobileLabel: 'A' },
    'Def': { value: 'Defense', mobileLabel: 'D' },
    'SpAtk': { value: 'SpAtk', mobileLabel: 'SA' },
    'SpDef': { value: 'SpDef', mobileLabel: 'SD' },
    'Speed': { value: 'Speed', mobileLabel: 'S' },
    'Total': { value: 'Total', mobileLabel: 'Tot' },
    'ID': { value: 'ID', mobileLabel: 'ID' },
}

export {
    columns,
    mapping
}