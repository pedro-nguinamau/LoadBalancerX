// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify()

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: `A plicação neste momento esta a rodar no: ${process.env.HOSTNAME}` }
})

// Run the server!
fastify.listen({ port: 3333, host: '0.0.0.0' }, async (err, adress) => {
    if(err) {
        console.log(err)
    }
    console.log(`Server listen in this ${adress}`)
});

