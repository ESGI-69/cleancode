import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.log(err);
  res.status(500).send({ message: err.message });
};

export default errorHandler;
