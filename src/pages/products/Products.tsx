import { useEffect, useState } from "react";
import { Select } from "antd";
import ProductCard from "../components/Product";
import { axiosApi } from "../../libs/axios";
import { useNavigate } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

interface ProductList {
    _id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
    createdAt: Date;
}

export default function ProductsPage() {
    const navigate = useNavigate()
    const [products, setProducts] = useState<ProductList[]>([]);
    const [filtered, setFiltered] = useState<ProductList[]>([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const categories = ["All", ...new Set(products.map((p) => p.category))];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axiosApi.get("/product");

            const data: ProductList[] = res.data.data;

            setProducts(data);
            setFiltered(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let temp: ProductList[] = [...products];

        if (search.trim() !== "") {
            temp = temp.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category !== "All") {
            temp = temp.filter((item) => item.category === category);
        }

        setFiltered(temp);
    }, [search, category, products]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>
            <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full min-w-56 md:w-1/3 px-4 py-2 border rounded-lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Select
                        className="w-full md:w-60 min-h-10"
                        value={category}
                        onChange={(value) => setCategory(value)}
                        options={categories.map((c) => ({
                            label: c,
                            value: c,
                        }))}
                    />
                </div>
                <button
                    className="p-3 bg-gray-800 text-white rounded-lg"
                    onClick={() => navigate("/cart")}
                >
                    <MdShoppingCart size={24} className="text-white" />
                </button>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((item) => (
                    <ProductCard
                        key={item._id}
                        _id={item._id}
                        image={item.imageUrl}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
}
