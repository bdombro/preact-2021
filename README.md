# A reference application for my react/preact R&D

Preview: https://dombro-preact-stack.vercel.app

**Currently under heavy development**

- Very few dependencies
- A novel router, featuring scroll restoration, stack routing, and tiny bundle size
- Crazy small bundles (total js is < 30kb gzipped)
- Extreme bundling performance c/o Snowpack + Esbuild
- Auto-creation of service-worker with Google Workbox
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
yarn build && yarn serve
```

### Deploying

This app is currently client-only, so is recommended to be deployed as a static website. Good options are Surge, Netlify, Vercel, Firebase Hosting, AWS S3, AWS Cloudfront.

If you'd like to deploy as a full-stack, I am a strong proponent for KISS. IMO, companies spend wayyyy to much on DevOps. 

My vendor comparison:

1. Heroku - Low complexity, free for low-traffic, $$$$ at scale 
2. AWS - Medium complexity, free for low-traffic, $ at scale. Config is high complexity, but can be simplified using frameworks like (Claudia)[https://github.com/claudiajs/claudia], (serverless-express)[https://github.com/vendia/serverless-express], or serverless.com. AWS is also the only provider of serverless SQL (Aurora).
3. Google - Medium complexity, $ for low-traffic, $$ at scale. Easier config than AWS, but more SQL management. 
4. Single Server (VPS) - Medium complexity, $ for low-traffic, not scalable
5. Managed Kubernetes - Trades complexity and cost for flexibility. Should be avoided unless required.

Advice: 
1. If low-traffic and inexperienced, start with Heroku
2. If low-traffic and willing to learn, AWS
3. Otherwise, AWS or Google are both solid choices

Refs:
1. https://github.com/vendia/serverless-express/tree/mainline/examples/basic-starter-api-gateway-v2
2. With RDS: https://gist.github.com/nathanmalishev/65b3f16c5acb0dc668453675b74298f3

