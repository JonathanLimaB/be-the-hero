const connection = require('../database/connection');

module.exports = {
  async index(request, response){
    /* Esquema de paginação */
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5) // limita a 5 casos para podermos fazer a paginação de 5 em 5
      .offset((page - 1) * 5) // adiciona a próxima pagina
      .select([
          'incidents.*',
          'ongs.name', 
          'ongs.email', 
          'ongs.watsapp',
          'ongs.city', 
          'ongs.uf']);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  /*Criação de caso*/
  async create(request, response){
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id
    });

    return response.json({ id });

  },

  /*deleção de caso*/
  async delete(request, response){
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }
};