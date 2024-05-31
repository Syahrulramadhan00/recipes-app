import * as z from 'valibot';

const recipeSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.optional(z.string()),
  imageType: z.optional(z.string()),
  servings: z.number(),
  readyInMinutes: z.number(),
  sourceUrl: z.string(),
  summary: z.string(),
  analyzedInstructions: z.array(z.object({
    name: z.string(),
    steps: z.array(z.object({
      number: z.number(),
      step: z.string(),
      ingredients: z.array(z.object({
        id: z.number(),
        name: z.string(),
        localizedName: z.optional(z.string()),
        image: z.optional(z.string())
      })),
      equipment: z.array(z.object({
        id: z.number(),
        name: z.string(),
        localizedName: z.optional(z.string()),
        image: z.optional(z.string())
      }))
    }))
  })),
  extendedIngredients: z.array(z.object({
    id: z.number(),
    name: z.string(),
    nameClean: z.nullable(z.string()),
    original: z.string(),
    originalName: z.string(),
    amount: z.number(),
    unit: z.string(),
    meta: z.array(z.string()),
    measures: z.object({
      us: z.object({
        amount: z.number(),
        unitShort: z.string(),
        unitLong: z.string()
      }),
      metric: z.object({
        amount: z.number(),
        unitShort: z.string(),
        unitLong: z.string()
      })
    })
  })),
  diets: z.array(z.string()),
  dishTypes: z.array(z.string()),
  cuisines: z.array(z.string()),
  instructions: z.string()
});

export default defineCachedEventHandler(async (event) => {
  console.log('Making fresh request');

  const config = useRuntimeConfig();
  const apiKey = config.spoonacular.apiKey;

  if (!apiKey) {
    console.error('API key is missing');
    throw new Error('API key is missing');
  }

  try {
    const { recipes } = await $fetch('https://api.spoonacular.com/recipes/random', {
      query: {
        limitLicense: true,
        number: 100,
        apiKey: apiKey
      }
    });

    return z.array(recipeSchema).parse(recipes);
  } catch (e) {
    console.error('Error fetching recipes:', e.message);
    if (e.issues) {
      console.error('Validation errors:', JSON.stringify(e.issues.map(i => i.path)));
    }
    return [];
  }
}, {
  base: 'recipes',
  getKey: () => 'recipes',
  shouldBypassCache: () => false,
  maxAge: 1000 * 60 * 60 * 24,
  staleMaxAge: 1000 * 60 * 60 * 24 * 7
});
