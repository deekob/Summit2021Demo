import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class ShoppingListItems {
  readonly id: string;
  readonly itemName: string;
  constructor(init: ModelInit<ShoppingListItems>);
  static copyOf(source: ShoppingListItems, mutator: (draft: MutableModel<ShoppingListItems>) => MutableModel<ShoppingListItems> | void): ShoppingListItems;
}