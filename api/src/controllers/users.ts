import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import service from '../services/users';

const getAllUsers = async(req:Request,res:Response,next:NextFunction) =>{
  let users:User[] = [];

  try{
    users = await service.getAllUsers();
  }catch(error:any){
    res.status(400).send({
      error:error.message
    })
  }

  res.send({users})
}

export default {
  getAllUsers
}