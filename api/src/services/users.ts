import User from '../models/User';
import repository from '../../src/repositories/user';

const getAllUsers = async():Promise<User[]> =>{
  return await repository.getAllUsers()
}

const getUserById = async(id:number):Promise<User>=>{
  return await repository.getUserById(id);
}

export default {
  getAllUsers,
  getUserById
}