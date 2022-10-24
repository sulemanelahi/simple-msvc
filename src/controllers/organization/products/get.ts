import ProductModel from '../../../models/product';

export default async (params: any): Promise<any> => {
    const productModel = new ProductModel();
    return await productModel.scan(params);
};
