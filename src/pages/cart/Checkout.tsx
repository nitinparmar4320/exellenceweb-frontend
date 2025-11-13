import { useEffect } from "react";
import { axiosApi } from "../../libs/axios";
import { toast } from "../../helpers/toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const navigate = useNavigate();

    const placeOrder = async () => {
        try {
            await axiosApi.delete(`/cart/remove/0`);
            toast.fire({
                icon: "success",
                title: "Order placed successfully!",
            });

            setTimeout(() => {
                navigate("/products");
            }, 1500);

        } catch (e: any) {
            toast.fire({
                icon: "error",
                title: e.response?.data?.message || "Order failed!",
            });
        }
    };

    useEffect(() => {
        placeOrder();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-md text-center">
                <h1 className="text-3xl font-bold text-green-600">Processing Order...</h1>
                <p className="text-gray-500 mt-3">Please wait</p>
            </div>
        </div>
    );
}

