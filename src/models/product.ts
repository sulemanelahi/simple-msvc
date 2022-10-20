import * as dynamoose from 'dynamoose';
// import { v4 as uuid } from 'uuid';
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
    this.DynaModel = dynamoose.model(table, ProductSchema, { create: environment.dynamo.create_tables });
  }

	_viewableAttributes = () => {
		return ["catalogId", "serviceArea", "name", "description", "type", "category", "subCategory", "barcode", "organizationProductCode", "images", "taxes", "pricePerUnit", "moq", "unit", "addons", "metaData", "status", "plu", "variationOfProductId", "data"];
	}

	_createAttributes = () => {
		return ["name", "serviceArea", "description", "type", "category", "subCategory", "barcode", "organizationProductCode","images", "taxes", "pricePerUnit", "moq", "addons", "unit", "metaData", "plu", "variationOfProductId"];
	}

	_updatableAttributes = () => {
		return ["name", "serviceArea", "description", "category", "subCategory", "barcode", "organizationProductCode", "pricePerUnit", "moq", "unit", "addons", "taxes", "metaData", "variationOfProductId", "status", "plu"];
	}

	_categoryAttributes = () => {
		return ['category']
	}

  _cleanParams = (params: any, event: string = "update") => {
		let cleanParams: any = {};
		let allowedParams = this._updatableAttributes();
		if (event == "create") {
			allowedParams = this._createAttributes();
		}

		Object.entries(params).forEach(([key, value]) => {
			if (allowedParams.includes(key)) {
				cleanParams[key] = value;
			}
		});

		return cleanParams;
	}

	_loadParams = (parameters: any) => {
		this.Model = new this.DynaModel(parameters);
		return this.Model;
	}

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
   const cleanParams = this._cleanParams(params);
   this._loadParams(cleanParams);

   this.Model.organizationId = organizationId;
   this.Model.catalogId = '8a6e0804-2bd0-4672-b79d-d97027f9071a'

   const model =await this.Model.save({
    overwrite: false,
  });

  return model;
  };

  get = () => {};
}
