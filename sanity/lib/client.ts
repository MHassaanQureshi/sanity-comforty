import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: 'skyTz698DVvUAcNBjowfJKXIaeJppNYfCeN8CCdh9QjYqGkxtcz7zQRVRfiJI9LhbYthLkWjwRG3arMNAi9PL7OzZZyyht3X5rUri9b44pQFpmMsuyeRM5VtlMTYevfyWwCeIr4IKcM1qiVNJso3KRmSJxf9aMN7KAxiMuWs8Ec9y5EYPq0F', // Ensure this token has the correct permissions
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
