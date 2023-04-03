import { Response, Request } from 'express';
import { dataFoodProducts } from './database';
import { IMarketProducts, IProductsData } from './interfaces';

let id = 1;

export const getProducts = (request: Request, response: Response): Response => {
  return response.status(200).json(dataFoodProducts);
};

export const getProductsById = (
  request: Request,
  response: Response
): Response => {
  const productById: IMarketProducts | undefined =
    dataFoodProducts.marketProducts.find(
      (productId) => productId.id === Number(response.locals.product.id)
    );

  return response.status(200).json(productById);
};

export const createProducts = (
  request: Request,
  response: Response
): Response => {
  const newProducts: IMarketProducts[] = [];

  const date = new Date();
  date.setDate(date.getDate() + 365);

  request.body.forEach((product: any) => {
    newProducts.push({
      id: id,
      expirationDate: date, // deve estar com esse formato: "2024-03-06T12:12:32.431Z"
      ...product,
    });

    id++;
  });

  dataFoodProducts.total = dataFoodProducts.marketProducts.reduce(
    (acc, cur) => acc + cur.price,
    0
  );

  dataFoodProducts.marketProducts.push(...newProducts);

  const newProductsResponse: IProductsData = {
    ...dataFoodProducts,
    total: newProducts.reduce((acc, cur) => acc + cur.price, 0),
    marketProducts: [...newProducts],
  };

  return response.status(201).json(newProductsResponse);
};

export const updateProducts = (
  request: Request,
  response: Response
): Response => {
  const verifyName: number = dataFoodProducts.marketProducts.findIndex(
    (product) => product.name === request.body.name
  );

  if (verifyName !== -1) {
    return response.status(409).json({
      error: 'Product already registered',
    });
  }

  const updateProductIndex: number = dataFoodProducts.marketProducts.findIndex(
    (productsId) => productsId.id === Number(response.locals.product.id)
  );

  const newObjectProduct: IMarketProducts = {
    ...dataFoodProducts.marketProducts[updateProductIndex],
    ...request.body,
  };

  dataFoodProducts.marketProducts[updateProductIndex] = newObjectProduct;

  return response.status(200).json(newObjectProduct);
};

export const deleteProducts = (
  request: Request,
  response: Response
): Response => {
  const productIndex: number = dataFoodProducts.marketProducts.findIndex(
    (productId) => productId.id == response.locals.product.id
  );

  dataFoodProducts.marketProducts.splice(productIndex, 1);

  return response.status(204).send();
};
