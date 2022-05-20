export default class Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    saleRate: number;
    saleFlat: number;
    description: string;
    image: string;
    isSale:boolean;

    constructor (id: number, name: string, quantity: number, description: string, price: number,saleRate: number,saleFlat: number, image: string, isSale:boolean) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
        this.saleRate = saleRate;
        this.saleFlat = saleFlat;
        this.image = image;
        this.isSale = isSale;
    }
}