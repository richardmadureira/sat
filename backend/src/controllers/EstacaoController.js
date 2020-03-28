const connection = require('../database/connection');

module.exports = {
	async create(req, res) {
		const { tipoEstacao, numero } = req.body;
		try {
			const [id] = await connection('estacoes').insert({ tipoEstacao, numero });
			return res.json({ id, tipoEstacao, numero });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	async update(req, res) {
		const { id } = req.params;
		try {
			const result = await connection('estacoes')
				.where('id', id)
				.select('*')
				.first();
			const { tipoEstacao, numero } = req.body;
			const data = { tipoEstacao, numero };
			if (result) {
				await connection('estacoes')
					.where('id', id)
					.update(data);
				return res.json({ id, ...data });
			}
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	async delete(req, res) {
		const { id } = req.params;
		try {
			await connection('estacoes')
				.where('id', id)
				.delete();
			return res.status(204).send();
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	async findById(req, res) {
		const { id } = req.params;
		try {
			const result = await connection('estacoes')
				.where('id', id)
				.select('*')
				.first();
			return res.json(result);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	async findAll(req, res) {
		const { page = 1, size = 5 } = req.query;
		try {
			const { tipoEstacao, numero } = req.body;
			const { whereRaw, args } = getClauseWhere(tipoEstacao, numero);
			const [count] = await connection('estacoes')
				.whereRaw(whereRaw, args)
				.count('*');
			const estacoes = await connection('estacoes')
				.whereRaw(whereRaw, args)
				.select('*')
				.offset((page - 1) * size)
				.limit(size);
			res
				.header('X-Total-Count', count['count(*)'])
				.header('X-Page-Number', page)
				.header('X-Page-Size', size)
				.json(estacoes);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
};

function getClauseWhere(tipoEstacao, numero) {
	let whereRaw = '';
	let args = [];
	let isClause = false;
	if (tipoEstacao) {
		if (isClause) whereRaw = whereRaw.concat(' and ');
		whereRaw = whereRaw.concat('tipoEstacao like ?');
		args[args.length] = '%' + tipoEstacao.trim() + '%';
		isClause = true;
	}
	if (numero) {
		if (isClause) whereRaw = whereRaw.concat(' and ');
		whereRaw = whereRaw.concat('numero = ?');
		args[args.length] = numero;
		isClause = true;
	}
	return { whereRaw, args };
}
