import { toast } from "../../helpers/toast";
import { axiosApi } from "../../libs/axios";
type ProductProps = {
    _id: string;
    image: string;
    name: string;
    price: number;
};

export default function ProductCard({ _id, image, name, price }: ProductProps) {

    const addToCart = async () => {
        try {
            await axiosApi.post("/cart/add", {
                productId: _id,
                quantity: 1,
            });

            toast.fire({
                icon: "success",
                title: "Added to cart!",
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
            <img
                src={image}
                alt={name}
                className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-blue-600 font-bold mt-1">₹{price}</p>

            {/* Buttons */}
            <div className="flex justify-between mt-3">
                <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                    onClick={addToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
