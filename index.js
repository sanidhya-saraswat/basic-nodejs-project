let server=require("./server")

// starting the server
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log('Server is listening to port:', port)
})