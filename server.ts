import Fastify from 'fastify'
import compressPlugin from 'fastify-compress'
import staticPlugin from 'fastify-static'
import * as fs from 'fs'
import * as path from 'path'


const
	https = false
	,buildRoot = path.join(__dirname, './build')
	,notFoundHtml = fs.readFileSync(path.join(buildRoot, '/index.html'))
	,sslKey = fs.readFileSync('snowpack.key', 'utf8')
	,sslCert = fs.readFileSync('snowpack.crt', 'utf8')
	,port = process.env.PORT || 3000

main()

async function main() {
	const fastify = Fastify({
		logger: false,
		...https ? {
			http2: true,
			https: { allowHTTP1: true, key: sslKey, cert: sslCert },
		} : {}
	})

	fastify.register(compressPlugin)

	fastify.register(staticPlugin, { root: buildRoot, maxAge: '30d' })
	fastify.setNotFoundHandler((req, reply) => { reply.type('text/html').send(notFoundHtml) })

	fastify.listen(port, (err, address) => {
		if (err) { fastify.log.error(err as any); process.exit(1) }
		fastify.log.info(`Server listening on ${address}`)
	})
}
