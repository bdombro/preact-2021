# A demo of how to make a lean, clean-URL stack router in react

- Only one client dependency (icons)
- Crazy small bundles (js is < 30kb gzipped)
- ES6 imports and prefetching
- Auto handles html A elements without need for Link
- Scroll restoration on browser back event
- Extreme bundling performance c/o Snowpack
- Auto-creation of service-worker with Workbox
- Enhanced `createContext`: In comparison to react's 
  context, it provides methods to access/mutate/subscribe
  to context outside of components and without hooks. This
  is really nice if you are optimizing the performance of 
  your app to avoid unnecessary rendors, and also can enable
  some really cool, otherwise impossible functionality.
- Custom css-in-js implementation that's similar to but 
  much leaner than `styled-components`
- Feature-rich material-design icons loader that lazy-loads
  icons and is extremely performance optimized
- The bundled server is a best-in-class Nodejs webserver 
  with HTTP2, SSL, compression


## Getting started

This javascript app requires Node with a version greater than 12. 

- I recommend you use nvm to install the latest node using (nvm)[https://github.com/nvm-sh/nvm], to easily switch node versions.
- Install `yarn` with `npm install --global yarn`
- Fork this template or use Github's "Template" feature and download it locally. 
- Run `yarn` to install the libraries.

## Developing

Start a snowpack dev server with hot-module-reloading (HMR) by:

```bash
yarn start
```

## Running

Start a production optimized http2 + ssl server by:

```bash
yarn build && yarn start
```

