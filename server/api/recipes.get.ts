import * as v from 'valibot';

const recipeSchema = v.object({
    id: v.number(),
    title: v.string(),
    image: v.optional(v.string()),
    imageType: v.optional(v.string()),
    servings: v.number(),
    readyInMinutes: v.number(),
    sourceUrl: v.string(),
    summary: v.string(),
    analyzedInstructions: v.array(v.object({
        name: v.string(),
        steps: v.array(v.object({
            number: v.number(),
            step: v.string(),
            ingredients: v.array(v.object({
                id: v.number(),
                name: v.string(),
                localizedName: v.string(),
                image: v.string()
            })),
            equipment: v.array(v.object({
                id: v.number(),
                name: v.string(),
                localizedName: v.string(),
                image: v.string()
            }))
        }))
    })),
    extendedIngredients: v.array(v.object({
        id: v.number(),
        name: v.string(),
        nameClean: v.optional(v.string()),
        original: v.string(),
        originalName: v.string(),
        amount: v.number(),
        unit: v.string(),
        image: v.nullable (v.string()),
        meta: v.array(v.string()),
        measures: v.object({
            us: v.object({
                amount: v.number(),
                unitShort: v.string(),
                unitLong: v.string()
            }),
            metric: v.object({
                amount: v.number(),
                unitShort: v.string(),
                unitLong: v.string()
            })
        })
    })),
    diets: v.array(v.string()),
    dishTypes: v.array(v.string()),
    cuisines: v.array(v.string()),  
    instructions: v.string()
});

export default defineCachedEventHandler(async event => {
    console.log('making fresh request');

    const { recipes } = await $fetch<{ recipes: unknown }>('https://api.spoonacular.com/recipes/random', {
        query: {
            limitLicense: true,
            number: 100,
            apiKey: useRuntimeConfig().spoonacular.apiKey
        }
    });

    try {
        return v.parse(v.array(recipeSchema), recipes);
    } catch (e) {
        console.log(e.issues.map(i => i.path));
    }
}, {
    base: 'recipes',
    getKey: () => 'recipes',
    shouldBypassCache: () => false,
    maxAge: 1000 * 60 * 60 * 24,
    staleMaxAge: 1000 * 60 * 60 * 24 * 7
});
