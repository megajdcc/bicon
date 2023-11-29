import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

import https from 'node:https'
import fs  from 'node:fs'

const options = {
  key: fs.readFileSync('/home/megajdcc/jdcc/certificados/beacons.key'),
  cert: fs.readFileSync('/home/megajdcc/jdcc/certificados/beacons.crt')
}

const host = 'beacons.dev'

export default defineConfig({
  
    base:'/',
    server:{
      host:host,
      port:5173,
      https:https.createServer(options,(req,res) => {
        res.writeHead(200);
        res.end('hello world\n');
      }).listen(8001),
      open:true,
    },

    plugins: [
      vue(),
      VitePWA({
        registerType:"prompt",
        manifest:{
                  "name":"Beacons App",
                  "id":"Beacons",
                  "short_name":"beacons",
                  "description":"Beacons APP ",
                  "dir":"ltr",
                  "display":"standalone",
                  "background_color":"#4ca6dd",
                  "theme_color":"#4ca6dd",
                  "lang":"es-MX",
                  "start_url":"/",
                  "scope":".",
                  "icons":[
                      {
                        "src": "./favicons/favicon-8x8.png",
                        "sizes": "8X8",
                        "type": "image/png",
                        "purpose": "any"
                      },

                      {
                        "src": "./favicons/favicon-16x16.png",
                        "sizes": "16X16",
                        "type": "image/png",
                        "purpose": "any"
                      },
                      {
                        "src": "./favicons/favicon-32x32.png",
                        "sizes": "32X32",
                        "type": "image/png",
                        "purpose": "any"
                      },
                      {
                        "src": "./favicons/favicon-57x57.png",
                        "sizes": "57X57",
                        "type": "image/png",
                        "purpose": "any"
                      },
                      {
                        "src": "./favicons/favicon-60x60.png",
                        "sizes": "60X60",
                        "type": "image/png",
                        "purpose": "any"
                      },
                      {
                        "src": "./favicons/favicon-72x72.png",
                        "sizes": "72X72",
                        "type": "image/png",
                        "purpose": "any"
                      },

                      {
                        "src": "./favicons/favicon-76x76.png",
                        "sizes": "76X76",
                        "type": "image/png",
                        "purpose": "any"
                      },

                      {
                        "src": "./favicons/favicon-96x96.png",
                        "sizes": "96X96",
                        "type": "image/png",
                        "purpose": "any"
                      },
                      {
                        "src": "./favicons/favicon-114x114.png",
                        "sizes": "114X114",
                        "type": "image/png",
                        "purpose": "any"
                      },

                      {
                        "src": "./favicons/favicon-120x120.png",
                        "sizes": "120X120",
                        "type": "image/png",
                        "purpose": "any"
                      },

                      {
                        "src": "./favicons/favicon-144x144.png",
                        "sizes": "144X144",
                        "type": "image/png",
                        "purpose": "any"
                      },

                      {
                        "src": "./favicons/favicon-152x152.png",
                        "sizes": "152X152",
                        "type": "image/png",
                        "purpose": "any"
                      },

                      {
                        "src": "./favicons/favicon-180x180.png",
                        "sizes": "180X180",
                        "type": "image/png",
                        "purpose": "any"
                      },

                      {
                        "src": "./favicons/favicon-192x192.png",
                        "sizes": "192X192",
                        "type": "image/png",
                        "purpose": "any"
                      },
                      
                  ]
                },
        workbox: {
            globStrict:true,
            globPatterns: ['**/*.{js,css,ico,png,jpg,jpeg,svg,html}'],
            skipWaiting: true,
            maximumFileSizeToCacheInBytes:2097152 * 6,
            globIgnores: ["**\\/node_modules\\/**\\/*"],
            runtimeCaching:[{
                urlPattern: ({url}) => ['https://api.beacons.dev'].includes(url.origin),
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'api-cache',
                    expiration: {
                        maxAgeSeconds: 2592000, // 30 días en segundos
                    },
                },
            },{
                urlPattern:({request}) => request.destination === 'image',
                handler:'CacheFirst',
                options: {
                    cacheName: 'images-cache',
                    expiration: {
                        maxAgeSeconds: 2592000, // 30 días en segundos
                    },
                },
            }],
        },
        devOptions: {
            enabled: true,
        }
      })
    ],

   
    

  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src'),
      '@themeConfig':path.resolve(__dirname,'./src/themeConfig.js'),
      'views':path.resolve(__dirname,'./src/views'),
      '@core':path.resolve(__dirname,'./src/@core'),
      '@validations':path.resolve(__dirname,'./src/@core/utils/validations/validations.js'),
      'store':path.resolve(__dirname,'./src/store'),
      'components':path.resolve(__dirname,'./src/views/components'),
      'router':path.resolve(__dirname,'./src/router'),
      'images':path.resolve(__dirname,'./src/assets/images/'),
      'scss':path.resolve(__dirname,'./src/assets/scss'),
      '@fuentes':path.resolve(__dirname,'./src/assets/fonts/'),
      '@images':path.resolve(__dirname,'./src/assets/images/'),
      '@variables':path.resolve(__dirname,'./src/assets/scss/variables/'),
      '@axios': path.resolve(__dirname,'./src/libs/axios'),
      '@views-core':path.resolve(__dirname,'./src/views-core')
    }

  },

  assetsInclude: ['**/*.png', '**/*.jpeg', '**/*.jpg', '**/*.svg', '**/*.gif'],
  build:{
      // assetsInlineLimit:0,
      manifest:true,
      sourcemap:true,
      chunkSizeWarningLimit:50000,
      commonjsOptions: {
          requireReturnsDefault: true,
      },
  },
})
