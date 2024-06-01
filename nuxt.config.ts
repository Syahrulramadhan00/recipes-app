// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    spoonacular: {
      apiKey: '2e4d465cfabf4bbda41f711f877763c9' 
    },
    public: {
      spoonacularApiKey: '2e4d465cfabf4bbda41f711f877763c9' 
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
  },

  image: {
    providers: {
      spoonacular: {
        provider: '~/providers/spoonacular.ts',
      }
    }
  },

  modules: ['@nuxt/ui', "@nuxt/image"]
});