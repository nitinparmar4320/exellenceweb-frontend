import { useEffect, useState } from "react";
import { axiosApi } from "../../libs/axios";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { toast } from "../../helpers/toast";

interface CartItem {
    productId: {
        _id: string;
        name: string;
        price: number;
        imageUrl: string;
    };
    quantity: number;
}

interface CartResponse {
    items: CartItem[];
}

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const res: any = await axiosApi.get<CartResponse>("/cart");
            setCart(res.data.data.items);
        } catch (e: any) {
            // toast.fire({
            //     icon: "error",
            //     title: e.response?.data?.message || "An Error Occured!",
            // });
        }
    };

    const increaseQty = async (productId: string, currentQty: number) => {
        try {
            await axiosApi.put(`/cart/update/${productId}`, {
                quantity: currentQty + 1,
            });
            loadCart();
        } catch (e: any) {
            toast.fire({
                icon: "error",
                title: e.response?.data?.message || "An Error Occured!",
            });
        }
    };

    const decreaseQty = async (productId: string, currentQty: number) => {
        if (currentQty === 1) return;

        try {
            await axiosApi.put(`/cart/update/${productId}`, {
                quantity: currentQty - 1,
            });
            loadCart();
        } catch (e: any) {
            toast.fire({
                icon: "error",
                title: e.response?.data?.message || "An Error Occured!",
            });
        }
    };

    const removeItem = async (productId: string) => {
        try {
            await axiosApi.delete(`/cart/remove/${productId}`);
            loadCart();
        } catch (e: any) {
            toast.fire({
                icon: "error",
                title: e.response?.data?.message || "An Error Occured!",
            });
        }
    };

    const total = cart.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen px-20">
            <div className="flex gap-3 justify-start items-center">
                <Link to={"/products"}>
                    <MdArrowBack size={28} className="hover:text-blue-500" />
                </Link>
                <h1 className="text-3xl font-bold">Cart</h1>
            </div>
            <div className="bg-white rounded-lg p-3 mt-10">
                {cart?.length == 0 &&
                    <div className="min-h-56 text-center content-center">
                        <h3 className="font-semibold text-lg">Not Found</h3>
                    </div>
                }
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div
                            key={item.productId._id}
                            className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.productId.imageUrl}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{item.productId.name}</h3>
                                    <p className="text-blue-600 font-bold">
                                        ₹{item.productId.price}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            decreaseQty(item.productId._id, item.quantity)
                                        }
                                        className="px-3 py-1 bg-gray-200 rounded"
                                    >
                                        -
                                    </button>

                                    <span className="font-semibold">{item.quantity}</span>

                                    <button
                                        onClick={() =>
                                            increaseQty(item.productId._id, item.quantity)
                                        }
                                        className="px-3 py-1 bg-gray-200 rounded"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeItem(item.productId._id)}
                                    className="px-4 py-1 bg-red-500 text-white rounded-lg"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-right mt-6">
                    <h2 className="text-2xl font-bold">
                        Total: <span className="text-blue-600">₹{total}</span>
                    </h2>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => navigate("/checkout")}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg text-lg"
                    >
                        Checkout
                    </button>
                </div>

            </div>
        </div>
    );
}
