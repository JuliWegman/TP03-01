import { query } from "express";

export class UsuarioService1 {
  login(user, pass) {
    return "token";
  }
}

export class UsuarioService2 {
  register(first_name, last_name, username, password) {
    const query=`Insert into users(first_name,last_name,username,password) values ("${first_name}","${last_name}","${username}","${password}")`;

  }
}


