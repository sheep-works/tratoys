// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import genSitemap from './scripts/genSitemap'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      version: require("./package.json").version
    }
  },
  app: {
    baseURL: "/tratoys/",
    head: {
      script: [{
        src: "https://www.googletagmanager.com/gtag/js?id=G-K6MLPFDJ7Y",
        async: true,
      },
      {
        innerHTML: `
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-K6MLPFDJ7Y');`,
        tagPriority: 9
      }
      ]
    }
  },
  nitro: {
    hooks: {
      compiled: genSitemap,
    }
  },
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
    // "@pinia-plugin-persistedstate/nuxt",
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  pwa: {
    registerType: "autoUpdate",
    includeAssets: ["favicon.ico"],
    client: {
      installPrompt: true,
    },
    manifest: {
      name: 'TraToys',
      description: "A tool set for translators",
      theme_color: "#ffffff",
      lang: "ja",
      short_name: "TraToys",
      start_url: "/tratoys/",
      display: "standalone",
      background_color: "#ffffff",
      icons: [
        {
          src: "favicon.ico",
          type: "image/png"
        },
      ]
    },
    workbox: {
      navigateFallback: null
    },
    devOptions: {
      enabled: true,
      type: "module"
    },
  },
})
