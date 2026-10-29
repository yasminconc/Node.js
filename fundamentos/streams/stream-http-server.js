import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunck, enconding, callback) {
    const transformed = Number(chunck.toString()) * -1

    console.log(transformed)
    

    callback(null, Buffer.from(String(transformed)))
  }
}

// req => ReadableStream
// res => WritableStream

const server = http.createServer(async (req, res) => {
  //pedaços que vamos receber da stream
  const buffers = []

  //Aguardar cada pedaço da strem ser retornada
  for await (const chunck of req) {
    buffers.push(chunck)
  }
  
  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)
  
  return res.end(fullStreamContent)

  // return req
  // .pipe(new InverseNumberStream())
  // .pipe(res)
})

server.listen(3334)