import bcrypt from 'bcryptjs';
import config from '../config/config';

class User{
  id?: number;
  name:string;
  occupation:string;
  bio:string;
  email:string;
  password?:string;

  constructor(email:string,name:string,occupation:string,bio:string,password?:string,id?:number){
    this.email = email;
    this.name = name;
    this.occupation = occupation;
    this.bio = bio;
    this.password =password;
    this.id = id;
  }
  async hashPassword() {
		let salt = await bcrypt.genSalt(config.saltRounds);
		let hash = await bcrypt.hash(String(this.password), salt);
		this.password = hash;
	}
  async verifyPassword(pass: string): Promise<boolean> {
		return await bcrypt.compare(pass, String(this.password));
	}
}

export default User