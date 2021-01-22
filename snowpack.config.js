/** @type {import("snowpack").SnowpackUserConfig } */

const nonRouteExtensions = 'js|css|ico|png|jpg|svg'

module.exports = {
  mount: {
    public: {url: '/', static: true},
    src: {url: '/dist'},
  },
  plugins: [
    '@snowpack/plugin-typescript',
    '@prefresh/snowpack',
    ['snowpack-plugin-hash',{ hashLength: 4,logLevel: 'error'}]
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
    // The recommend approach (above) doesn't work for deep routes for some reason
    {"match": "all", "src": `^(.(?!\.(${nonRouteExtensions})$))+$`, "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // bundle: true,
    // minify: true,
    target: 'es2020',
    // splitting: true,
    // treeshake: true,
    // manifest: true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    output: "stream",
  },
  buildOptions: {
    /* ... */
  },
  alias: {
    "~": "./src"
  }
}
