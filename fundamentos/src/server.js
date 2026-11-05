// const http = require('http')

//CommonJS => require
//ESModules => import/export

//Como fazemos para diferenciar um módulo terceiro para um módulo que é interno do Node? Devemos colocar um pre fixo antes do import de cada modulo interno 'node:http'

//localhost:3333

//Criar usuários
//Listar usuários
//Editar Usuários
//Remover Usuários

// Uma requisição HTTP ela é composta por 2 pricipais recursos:
// - MÉTODO HTTP
// - URL

//GET => Buscar um recurso do back-end
//POST => Criar um rescurso no back-end
//PUT => Atualizar um recurso no back-end
//PATCH => Atualizar uma informação específica
//DELETE => Deleter um recurso no back-end

//Stateful - StateLess

//Stateful => depende das informações salvas localmente, em memória e funciona
//de forma diferente quando se perde parte da memória

//Stateless => Depende de informações salvas externamente como num banco de dados
//E funciona normalmente sem depender de informações salvas em memória

//Cabeçalhos (Requisição/Resposta) => Metadados
//Precisamos informar através do cabeçalho que tipo de formato estamos enviando

//HTTP Status code 

// information responses 100 - 199
//sucessful responses 200 - 299
//redirection messages 300 - 399
//client error responses 400 - 499
//server error responses 500 - 599


import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'

//UUID => Unique Universal ID


const database = new Database()

const server = http.createServer( async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {

    const {name, email} = req.body

    const user = {
      id: randomUUID(),
      name,
      email
    }

    database.insert('users', user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)

