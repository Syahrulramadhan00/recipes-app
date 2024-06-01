import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'
import { size } from 'valibot'

const operationsGenerator = createOperationsGenerator()

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL = 'https://img.spoonacular.com' } = {}
) => {

    const sizes = [100, 250, 500]
    const size = modifiers.width || modifiers.height || 250
    const nextBiggest = sizes.find((s) => s >= size) || sizes[sizes.length - 1]
    const prefix = `ingredients_${nextBiggest}x${nextBiggest}`
    const imageName = src.includes('.') ? src : `${src}.jpg`

  return {
    url: joinURL(baseURL, prefix, src, imageName),
  }
}
