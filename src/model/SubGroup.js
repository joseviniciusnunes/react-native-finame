export default {
    name: 'SubGroup',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        group: { type: 'Group' },
    }
}
