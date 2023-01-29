import db from '../config/db'
import User from '../models/User'

const createUserQuery = `INSERT INTO "User"(email, password) VALUES ($1, $2) RETURNING id;`
const getUserByEmailQuery = `SELECT * FROM "User" WHERE email = $1;`
const getAllUsersQuery = `SELECT email,name,bio,occupation from "User";`

const createUser = async (user:User):Promise<number>=>{
  let res;
  try {
    res = await db.query(createUserQuery, [user.email, user.password]);
  } catch (error:any) {
    throw new Error(error.message);
  }
  return res.rows[0]?.id;
}

const getAllUsers = async():Promise<User[]>=>{
  let res;
  let users:User[] = [];

  try{
    res= await db.query(getAllUsersQuery);
  }catch(error:any){
    throw new Error(error.message)
  }
  for (const row of res.rows) {
    let user = new User(row.email,row.name,row.occupation,row.bio,'',row.id);
    delete user.password
    users.push(user)
  }
  return users
}

const getUserByEmail = async (email:string):Promise<User>=>{
  let res;
  try {
    res = await db.query(getUserByEmailQuery, [email]);
  } catch (error:any) {
    console.error('Failed to get user by email', error);
    throw new Error(error.message);
  }

  if(res.rowCount === 0) throw new Error('User not found');

  return new User(res.rows[0]?.email,
    res.rows[0]?.name,
    res.rows[0]?.occupation,
    res.rows[0].bio,
    res.rows[0]?.password,
    res.rows[0]?.id)
}

export default {createUser,getUserByEmail,getAllUsers}