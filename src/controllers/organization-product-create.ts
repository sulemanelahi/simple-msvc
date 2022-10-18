import ProductModel from '../models/product';

export default async (orgnaizationId: string, params: any): Promise<any> => {
 const productModel = new ProductModel();
 return await productModel.save()
};
