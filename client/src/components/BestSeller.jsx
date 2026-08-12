import useAppContext, { AppContext } from "../context/AppContext";
import ProductCart from "./ProductCart";

export default function BestSeller(){
    const {products}=useAppContext()
    return(
        <div className="mt-16">
            <p className="text-2xl md:text-3xl font-medium">Best Seller</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 lg:grid-cols-4 mt-6">
                {products.filter((product)=> product.inStock).slice(0,5).map((product,index)=>( 
                    <ProductCart key={index} product={product}/>
                ))}
            </div>
        </div>
    )
}