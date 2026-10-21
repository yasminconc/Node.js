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

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com'
    })

    return res.end('Criação de usuários')
  }

  return res.end('Hello tste')
})

server.listen(3333)

