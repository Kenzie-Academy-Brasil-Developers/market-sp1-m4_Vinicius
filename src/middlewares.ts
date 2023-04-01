import { Response, Request } from 'express';
import { NextFunction } from 'connect';
import { dataFoodProducts } from './database';

export const verifyNameExist = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  for (let i = 0; i < request.body.length; i++) {
    const verifyName = dataFoodProducts.marketProducts.findIndex(
      (product) => product.name === request.body[i].name
    );

    if (verifyName !== -1) {
      return response.status(409).json({
        error: 'Product already registered',
      });
    }
  }

  return next();
};

export const verifyIdExist = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const verifyId = dataFoodProducts.marketProducts.findIndex(
    (product) => product.id === Number(request.params.id)
  );

  if (verifyId == -1) {
    return response.status(404).json({
      error: 'Product not found',
    });
  }

  response.locals.product = {
    id: request.params.id,
  };

  return next();
};
