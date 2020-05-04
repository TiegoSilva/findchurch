const connection = require('./../database/connection')

module.exports = { 
    async list(req, res){ 
        const churches = await connection('churches').select('*')
        return res.json(churches)
    },

    async create(req, res){
        const { nome, logradouro, numero, cep, estado, cidade, latitude, longitude } = req.body
        const [id] = await connection('churches')
            .insert(
                { 
                    nome, 
                    logradouro, 
                    numero, 
                    cep, 
                    estado, 
                    cidade, 
                    latitude, 
                    longitude
                }
            ) 

        return  res.json({id});
    },

    async getNearestedChurches(req, res){
        const {latitude, longitude} = req.params

        try {
        connection.raw(`
            select *, 
            ACOS(SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude)) + COS(RADIANS(${latitude})) * COS(RADIANS(lat))* COS(RADIANS(lng - ${longitude}))) * 3959 as distance from churches`)
            .then(function(resp) { 
                return res.json(resp)
            })
            .catch(function (error){
                return res.status(401)
            })
        }catch(err){
            return res.send(`we got a error ${err}`)
        }
    },

    async delete(req, res){
        const { id } = req.params

        await connection('churches').where('id', id).delete('id', id)
        return res.status(204).send()
    },

}