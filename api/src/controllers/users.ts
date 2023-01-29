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

const getUserById = async(req:Request,res:Response,next:NextFunction) =>{
  let id = Number(req.params.id);
  let user
  try{
    user = await service.getUserById(id);
  }catch(error:any){
    if(error.message.includes('not found')){
      return res.status(404).send({
        error:error.message
      })
    }
    return res.status(400).send({
      error:error.message
    })
  }

  res.send({user})
}

export default {
  getAllUsers,
  getUserById
}