import noIdProduct from "../../models/noIdProduct";
import Product from "../../models/Product";
import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient";

const baseURL = "/api/product"

export const apiGetAllProducts = async (): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `${baseURL}`
    );
    return { status: response.status, payload: response.data };
}

export const apiGetProductById = async (id: number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `${baseURL}/${id}`
    );
    return { status: response.status, payload: response.data };
}

export const apiGetProductByName = async (name: string): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `${baseURL}/${name}`
    );
    return { status: response.status, payload: response.data };
}

export const apiUpsertProduct = async (noIdProduct: noIdProduct): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.put<any>(
        `${baseURL}`,
        noIdProduct
    );
    return { status: response.status, payload: response.data };
}

export const apiPurchase = async (products: {id: number, quantity: number}[]): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.patch<any>(
        `${baseURL}`,
        products
    );
    return { status: response.status, payload: response.data };
}

export const apiDeleteProduct = async (id: number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.delete<any>(
        `${baseURL}/${id}`
    );
    return { status: response.status, payload: response.data };
}