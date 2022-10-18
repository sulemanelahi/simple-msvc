import * as dynamoose from 'dynamoose';
import * as AWS from 'áws-sdk';
import { v4 as uuid } from 'uuid';
import connectWithDynamo from '../config/connectDynamooseWithAWS';
import ProductSchema from '../schema/product';
import { environment } from '../environments';

connectWithDynamo(dynamoose, environment);

const enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

const table = environment.tables.catalog;

export default class ProductModel {
  DynaModel: any;
  Model: any;
  cloudFront: any;

  constructor() {
    this.DynaModel = dynamoose.Model(table, ProductSchema, { create: environment.dynamo.create_tables });
    this.cloudFront = new AWS.CloudFront();
  }

  _viewableAttributes = () => {
    return [
      'catalogId',
      'serviceArea',
      'name',
      'description',
      'type',
      'category',
      'subCategory',
      'barcode',
      'organizationProductCode',
      'images',
      'taxes',
      'pricePerUnit',
      'moq',
      'unit',
      'addons',
      'metaData',
      'status',
      'plu',
      'variationOfProductId',
      'data',
    ];
  };

  _createAttributes = () => {
    return [];
  };

  _updatableAttributes = () => {
    return [];
  };

  _categoryAttributes = () => {
    return [];
  };

  _cleanParams = () => {};

  _loadParams = () => {};

  getById = () => {};

  getByOrganization = () => {};

  getByCategories = () => {};

  scan = async (params: any): Promise<any> => {
    if (!params.organizationId) {
      return Promise.resolve(false);
    }

    return await this.DynaModel.scan(params).attributes(this._viewableAttributes()).exec();
  };

  isInActive = () => {};

  isDeleted = () => {};

  delete = () => {};

  update = () => {};

  save = async (organizationId: string, params: any) => {
   const cleanParams = this._cleanParams(params)
   this._loadParams(cleanParams)
  };

  get = () => {};
}
