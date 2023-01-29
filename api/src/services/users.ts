import User from '../models/User';
import repository from '../../src/repositories/user';

const getAllUsers = async():Promise<User[]> =>{
  return await repository.getAllUsers()
}

export default {
  getAllUsers
}