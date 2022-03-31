const createOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
                author: { type: 'string' },
                category: { type: 'string' },
                price: { type: 'number' },
                notes: { type: 'string' }
            }

        }
    },
};

const listOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    author: { type: 'string' },
                    category: { type: 'string' },
                    price: { type: 'number' },
                    notes: { type: 'string' },

                },
            },
        },
    },
}
module.exports = {
    createOpts,
    listOpts
}