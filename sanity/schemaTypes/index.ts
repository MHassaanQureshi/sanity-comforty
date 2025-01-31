import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './product'
import { categorySchema } from './categories'
import { cartSchema } from './cart'
import { orderSchema } from './order'
import { userSchema } from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema,categorySchema,cartSchema,orderSchema,userSchema],
}
