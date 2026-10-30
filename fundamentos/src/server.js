// const http = require('http')

//CommonJS => require
//ESModules => import/export

import http from 'node:http'

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

const users = []

const server = http.createServer( async (req, res) => {
  const { method, url } = req

  const buffers = []

  //Aguardar cada pedaço da strem ser retornada
  for await (const chunck of req) {
    buffers.push(chunck)
  }
  try {
     req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch{
    req.body = null
  }
 

  if (method === 'GET' && url === '/users') {
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {

    const {name, email} = req.body

    users.push({
      id: 1,
      name,
      email,
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)

