<template>
  <UContainer>
    <h1 class="mt-4 font-bold text-xl pt-12">{{ recipe.title }}</h1>
    <div class="flex flex-row gap-1 mt-2">
      <UBadge v-for="(label, index) in recipe.dishTypes" :key="index" :label="label" />
    </div>
    <section class="mt-4 flex flex-col md:flex-row-reverse gap-4 w-full">
      <NuxtImg :src="recipe.image" :alt="recipe.title" class="object-cover w-full" />
      <p class="text-lg max-w-[40ch]" v-html="recipe.summary"></p>
    </section>
    <section>
      <div>
        <h2>Ingredients</h2>
      </div>
      <UTable :rows="recipe.extendedIngredients" :columns="columns">
        <template #name-data="{ row }">
          <NuxtImg provider="spoonacular" :src="row.image" height="20" width="20" :alt="`Image of ${row.name}`" />
          ({{ [row.measures[unit].amount, row.measures[unit].unitLong].filter(Boolean).join(' ') }})
        </template>
      </UTable>
    </section>
  </UContainer>
  <pre>
    {{ recipe }}
  </pre>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetch } from '#app'
import type { InternalApi } from 'nitropack'


const { data: recipes } = await useFetch('/api/recipes')
const recipe = ref(recipes.value![0])

const columnsToShow: Array<keyof InternalApi['/api/recipes']['get'][number]['extendedIngredients'][number]> = ['name']
const columns = columnsToShow.map(col => ({ key: col, label: col }))

const metric = ref(true)
const unit = computed(() => metric.value ? 'metric' : 'us')
</script>
