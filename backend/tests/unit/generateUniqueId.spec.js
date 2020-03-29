const generateId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () =>{
    it('shoud generate an unique ID', () => {
        const id = generateId();

        expect(id).toHaveLength(8);
    })
})