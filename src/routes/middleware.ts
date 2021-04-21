import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { UserRoles } from '@entities/User';
import { Bearer } from 'permit';
import { JwtService } from '@shared/JwtService';


const permit = new Bearer({});
const jwtService = new JwtService();
const { UNAUTHORIZED } = StatusCodes;


// Middleware to verify if user is an admin
export const adminMW = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get json-web-token
    const jwt = permit.check(req);
    if (!jwt) {
      permit.fail(res);
      throw Error('JWT not present in authorization header.');
    }
    // Make sure user role is an admin
    const clientData = await jwtService.decodeJwt(jwt);
    if (clientData.role === UserRoles.Admin) {
      res.sessionUser = clientData;
      next();
    } else {
      throw Error('User is not admin!');
    }
  } catch (err) {
    return res.status(UNAUTHORIZED).json({
      error: err.message,
    });
  }
};
