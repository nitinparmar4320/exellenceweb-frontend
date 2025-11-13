import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosApi } from "../../libs/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../../helpers/toast";
import { useEffect } from "react";

export default function Login() {
    const navigate = useNavigate();
    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);
            const { data } = await axiosApi.post("user/login", values);
            if (data.status === 200) {
                localStorage.setItem('token', data.data);
                navigate('/products');
            }
        } catch (error: any) {
            toast.fire({
                icon: "error",
                title: error.response?.data?.message || "Login failed",
            });
        } finally {
            setSubmitting(false);
        }
    }
    useEffect(() => {
        localStorage.clear()
    }, [])

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Login
                    </h2>

                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email("Invalid email")
                                .required("Email is required"),
                            password: Yup.string()
                                .min(6, "Password must be at least 6 characters")
                                .required("Password is required"),
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="py-5 space-y-5">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-0"
                                    />
                                    <ErrorMessage name="email"
                                        component="p"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-2 outline-0 border border-gray-300 rounded-lg"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-2 text-white font-semibold rounded-lg transition duration-200 bg-blue-400 hover:bg-blue-500`}
                                >
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <div className="text-center w-full">
                        <strong className="text-sm">Don't have an account? <Link to="/register" className="text-blue-400">Register</Link></strong>
                    </div>
                </div>
            </div>
        </>
    )
}
