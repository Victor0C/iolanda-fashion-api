import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as uuid from 'uuid';

@Injectable()
export class UuidValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!uuid.validate(id)) {
      return res.status(400).json({ error: 'Invalid UUID' });
    }

    next();
  }
}
