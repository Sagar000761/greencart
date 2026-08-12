import { categories } from "../assets/assets";
import useAppContext, { AppContext } from "../context/AppContext";

export default function Categories(){
    const {navigate}=useAppContext()
    return(
        <div className="mt-16 ">
            <p className="text-2xl md:text-3xl font-medium">Categories</p>
            <div className="grid grid-col-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6"  >

        {categories.map((categories,index)=>(
            <div key={index} className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
            style={{backgroundColor:categories.bgColor}}
            onClick={()=>{
                navigate(`/allproducts/${categories.path.toLowerCase()}`)
                scrollTo(0,0)
            }}>
            <img className="group-hover:scale-108 transition max-w-28" src={categories.image} alt={categories.text} />
            <p className="text-sm font-medium">{categories.text}</p>
            </div>
        ))}
            </div>
        </div>
    )
}