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

export const tags = {
  example,
  users,
};
