interface Tag {
  name: string;
  description?: string;
}

const example: Tag = {
  name: 'Example',
};

const users: Tag = {
  name: 'Users',
};
const recipes: Tag = {
  name: 'Recipes',
};
const expenses: Tag = {
  name: 'Expenses',
};
const cashflows: Tag = {
  name: 'Cashflows',
};
export const tags = {
  example,
  users,
  recipes,
  expenses,
  cashflows,
};
