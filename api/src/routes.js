import cors from 'cors';
import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

const app = express();
const { Router } = express;
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

import ProdutoController from './app/controllers/ProdutoController';
import UsuarioController from './app/controllers/UsuarioController';
import FileController from './app/controllers/FileController';
import MedicamentoController from './app/controllers/MedicamentoController';
import VendaController from './app/controllers/VendaController';
import ClienteController from './app/controllers/ClienteController';
import PacienteController from './app/controllers/PacienteController';
import ProntuarioController from './app/controllers/ProntuarioController';


const routes = new Router();
const upload = multer(multerConfig);

//Post
routes.post('/produto', ProdutoController.store);
routes.post('/medicamento', cors(corsOptions), MedicamentoController.store);
routes.post('/usuario', UsuarioController.store);
routes.post('/cliente', ClienteController.store);
routes.post('/paciente', PacienteController.store);
routes.post('/venda', VendaController.store);
routes.post('/prontuario', ProntuarioController.store);

routes.post('/files', upload.single('file'), FileController.store);

//Put
routes.put('/produto', ProdutoController.update);
routes.put('/medicamento', MedicamentoController.update);
routes.put('/cliente', ClienteController.update);
routes.put('/usuario', UsuarioController.update);
routes.put('/venda', VendaController.update);
routes.put('/paciente', PacienteController.update);
routes.put('/prontuario', ProntuarioController.update);


//Get
routes.get('/produto', ProdutoController.index);
routes.get('/produto/:id', ProdutoController.show);
routes.get('/medicamento', MedicamentoController.index);
routes.get('/medicamento/:id', MedicamentoController.show);
routes.get('/venda', VendaController.index);
routes.get('/venda/:id', VendaController.show);
routes.get('/cliente', ClienteController.index);
routes.get('/cliente/:id', ClienteController.show);
routes.get('/paciente', PacienteController.index);
routes.get('/paciente/:id', PacienteController.show);
routes.get('/prontuario', ProntuarioController.index);
routes.get('/prontuario/:id', ProntuarioController.show);

routes.get('/usuario', UsuarioController.index);
routes.get('/usuario/:id', UsuarioController.show);

//Delete
routes.delete('/medicamento/:id', MedicamentoController.delete);
routes.delete('/produto/:id', ProdutoController.delete);
routes.delete('/venda/:id', VendaController.delete);
routes.delete('/cliente/:id', ClienteController.delete);
routes.delete('/usuario/:id', UsuarioController.delete);
routes.delete('/paciente/:id', PacienteController.delete);
routes.delete('/prontuario/:id', ProntuarioController.delete);



export default routes;
