
import React from 'react'
import { apiGetProductById } from "../remote/e-commerce-api/productService";

type Props = {}

const ProductDetail = (props: Props) => {

    const [product, setProduct] = React.useState<any>({})


    function getProductById(){
        const location = window.location.href;
        const productId = location.split("/")[4];
        return parseInt(productId);
    }
    

    React.useEffect(() => {
        const productId =  getProductById(); 

        apiGetProductById(productId)
            .then(setProduct)   // setProduct is a function
            .catch(console.log)
    }, [])
        
console.log(product);
    


  return (
    <>
    <div>Product Detail</div>
    <div>{product.payload.name}</div>

    </>
  )
}

export default ProductDetail
