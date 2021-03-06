const connection = require('../database/connection');
const generateId = require('../utils/generateUniqueId');

module.exports = {

    /* lista todas as ongs cadastradas */
    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);

    },

    /* criação de ong */
    async create(request, response){
        const { name, email, watsapp, city, uf } = request.body; // ele desestruturou a variável assim { name, wmail, watsapp, city, uf } para pegar tudo separado ao inves de um unico array

        const id = generateId();
      
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

    /* deleção de ongs*/
    async delete(request, response){
        const ong_id = request.headers.authorization;

            await connection('ongs').where('id', ong_id).delete();
    
        return response.status(204).send();
      }
};