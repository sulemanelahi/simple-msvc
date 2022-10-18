import * as dynamoose from 'dynamoose';

const schema = {
  organizationId: {
    type: String,
    hashKey: true,
    required: true,
    index: {
      name: 'organizationIdIndex',
      throughput: {
        read: 5,
        write: 10,
      },
      global: true,
      rangeKey: 'plu',
    },
  },
  catalogId: {
    type: String,
    required: true,
    index: {
      name: 'çatalogIdIndex',
      throughput: {
        read: 5,
        write: 10,
      },
      global: true,
    },
  },
  data: {
    type: String,
    required: true,
    set: (value: string) => `${value.toUpperCase()}`,
    rangeKey: true,
  },
  variationOfProductId: String,
  name: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ['SERVICE', 'PRODUCT', 'COMBO'],
    required: true,
    default: 'PRODUCT',
  },
  serviceArea: {
    type: String,
    required: true,
    default: 'KITCHEN',
  },
  category: String,
  subCategory: String,
  barcode: String,
  plu: {
    type: String,
    required: false,
    default: '000',
  },
  organizationProductcode: String,
};

export default new dynamoose.Schema(schema, {
  saveUnkown: ['metadata.**'],
  timestamps: true,
});
