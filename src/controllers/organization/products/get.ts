import ProductModel from '../../../models/product';

export default async (organizationId: string): Promise<any> => {
    const productModel = new ProductModel();
    return await productModel.getByOrganization(organizationId);
};
