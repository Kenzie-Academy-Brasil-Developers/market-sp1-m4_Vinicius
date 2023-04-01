import Express from 'express';
import {
  createProducts,
  deleteProducts,
  getProducts,
  getProductsById,
  updateProducts,
} from './logic';
import { verifyIdExist, verifyNameExist } from './middlewares';

const app = Express();

app.use(Express.json());

app.post('/products', verifyNameExist, createProducts);
app.get('/products', getProducts);
app.get('/products/:id', verifyIdExist, getProductsById);
app.patch('/products/:id', verifyIdExist, verifyNameExist, updateProducts);
app.delete('/products/:id', verifyIdExist, deleteProducts);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running in http://localhost: ${port}`);
});
