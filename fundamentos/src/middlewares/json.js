
export async function json(req, res) {
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

  res.setHeader('Content-type', 'application/json')
}