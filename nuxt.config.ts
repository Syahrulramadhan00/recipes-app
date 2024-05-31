// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    spoonacular: {
      apiKey: '2e4d465cfabf4bbda41f711f877763c9' // Private key for server-side use
    },
    public: {
      spoonacularApiKey: '2e4d465cfabf4bbda41f711f877763c9' // Optional if you need it client-side
    }
  },
  $development: {  
    nitro: {
      storage: {
        recipes: {
          driver: 'fs',
          base: 'recipes'
        }
      }
    }
  }
});
