import * as Yup from 'yup';
import Venda from '../models/Venda';

class VendaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      data: Yup.date().required(),
      valor: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { id, data, valor } = await Venda.create(req.body);

    return res.json({
      id,
      data,
      valor,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      data: Yup.date().required(),
      valor: Yup.number().required(),
      vendaId: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }


    const venda = await Venda.findByPk(req.body.vendaId);

    const { id, data, valor } = await venda.update(req.body);

    return res.json({
      id,
      data,
      valor,
    });
  }

  async index(req, res) {
    const vendas = await Venda.findAll();

    return res.json(vendas);
  }

  async show(req, res) {
    const id = req.params.id;
    const venda = await Venda.findByPk(id);

    if (venda) {
      res.json(venda);
    }
    else {
      res.json({ message: 'Venda não encontrado' })
    }

  }

  async delete(req, res) {
    const id = req.params.id;
    const venda = await Venda.findByPk(id);

    if (venda) {
      venda.destroy();
      res.json({ message: 'Venda removido com sucesso' })
    }
    else {
      res.json({ message: 'Venda não encontrado' })
    }

  }

}

export default new VendaController();