import { Router } from 'express';
import ClientesController from './app/controllers/ClientesController.js';
import ComprasController from './app/controllers/ComprasController.js';
import DespesasController from './app/controllers/DespesasController.js';
import FornecedoresController from './app/controllers/FornecedoresController.js';
import FuncionariosController from './app/controllers/FuncionariosController.js';
import GruposController from './app/controllers/GruposController.js';
import ProdutosController from './app/controllers/ProdutosController.js';
import VendasController from './app/controllers/VendasController.js';


const routes = new Router();

//fornecedores
routes.get('/fornecedores', FornecedoresController.index);
routes.post('/fornecedores', FornecedoresController.store);
routes.put('/fornecedores', FornecedoresController.update);
routes.delete('/fornecedores/:id', FornecedoresController.delete);

//compras
routes.get('/compras', ComprasController.index);
routes.post('/compras', ComprasController.store);
routes.put('/compras', ComprasController.update);
routes.delete('/compras/:id', ComprasController.delete);

//vendas
routes.get('/vendas', VendasController.index);
routes.post('/vendas', VendasController.store);
routes.put('/vendas', VendasController.update);
routes.delete('/vendas/:id', VendasController.delete);

//funcionarios
routes.get('/login/:login/:senha', FuncionariosController.show);
routes.get('/funcionarios', FuncionariosController.index);
routes.post('/funcionarios', FuncionariosController.store);
routes.put('/funcionarios', FuncionariosController.update);
routes.delete('/funcionarios/:id', FuncionariosController.delete);

//despesas
routes.get('/despesas', DespesasController.index);
routes.post('/despesas', DespesasController.store);
routes.put('/despesas', DespesasController.update);
routes.delete('/despesas/:id', DespesasController.delete);

//clientes
routes.get('/clientes', ClientesController.index);
routes.post('/clientes', ClientesController.store);
routes.put('/clientes', ClientesController.update);
routes.delete('/clientes/:id', ClientesController.delete);

//grupos
routes.get('/grupos', GruposController.index);
routes.post('/grupos', GruposController.store);
routes.put('/grupos', GruposController.update);
routes.delete('/grupos/:id', GruposController.delete);

//produtos
routes.get('/produto/:id', ProdutosController.show);
routes.get('/produtos', ProdutosController.index);
routes.post('/produtos', ProdutosController.store);
routes.put('/produtos', ProdutosController.update);
routes.delete('/produtos/:id', ProdutosController.delete);

export default routes;