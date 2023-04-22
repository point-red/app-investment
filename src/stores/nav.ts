import { defineStore } from "pinia";

export interface NavItem {
  label: string;
  name: string;
}

export type RootState = {
  items: NavItem[];
};

export const useNavStore = defineStore("nav", {
  state: () =>
    ({
      items: [],
    } as RootState),
  actions: {
    create(items: NavItem[]) {
      this.items = items;
    },
  },
});
