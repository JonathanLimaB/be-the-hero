const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);

    },

    async create(request, response){
        const { name, email, watsapp, city, uf } = request.body; // ele desestruturou a variável assim { name, wmail, watsapp, city, uf } para pegar tudo separado ao inves de um unico array

        const id = crypto.randomBytes(4).toString('HEX');
      
        await connection('ongs').insert({
            id,
            name,
            email,
            watsapp,
            city,
            uf
        })
      
        return response.json({ id });
    },

    async delete(request, response){
        const ong_id = request.headers.authorization;

    
            await connection('ongs').where('id', ong_id).delete();
    
        return response.status(204).send();
      }
};