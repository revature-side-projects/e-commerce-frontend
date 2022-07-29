export default class noIdProduct {
    name: string;
    quantity: number;
    price: number;
    description: string;
    image: string;

    constructor (name: string, quantity: number, description: string, price: number, image: string) {
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
        this.image = image;
    }

}