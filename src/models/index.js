// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ShoppingListItems } = initSchema(schema);

export {
  ShoppingListItems
};