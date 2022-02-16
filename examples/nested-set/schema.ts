import { list } from '@keystone-6/core';
import { select, relationship, text, timestamp } from '@keystone-6/core/fields';
import { nestedSet } from '@k6-contrib/fields-nested-set';
import 'dotenv/config';

export const lists = {
  Product: list({
    fields: {
      title: text({ validation: { isRequired: true } }),
      status: select({
        type: 'enum',
        options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' },
        ],
      }),
      description: text(),
      publishDate: timestamp(),
      author: relationship({ ref: 'Author.products', many: false }),
      nestedProduct: nestedSet()
    },
  }),
  Author: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      products: relationship({ ref: 'Product.author', many: true }),
    },
  }),
};
