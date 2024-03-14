import { ref } from 'vue'

export function useAsset(assetPath) {
  // eslint-disable-next-line no-undef
  const basePath = process.env.NODE_ENV === 'production' ? '.' : 'src/'
  return ref(`${basePath}/${assetPath}`)
}
