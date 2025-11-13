import { Link } from "react-router-dom";

const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
    };
    return (
        <header className="w-full flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
            <Link to={"/products"}
                className="text-2xl font-bold cursor-pointer"
            >
                E - Comm
            </Link>

            <div className="flex items-center gap-4">
                <div onClick={handleLogout}>
                    <Link to={"/"}
                        className="px-3 py-1 border border-red-500 text-red-500 rounded-lg"
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
