import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { toast } from 'react-toastify';
import { axiosApi } from "../../libs/axios";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { toast } from "../../helpers/toast";

export default function Register() {

    const navigate = useNavigate();
    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);
            const { data } = await axiosApi.post("user/sign-up", values);
            if (data.status === 201) {
                // toast.success(data.message);
                navigate('/');
                toast.fire({
                    icon: "success",
                    title: "Success!",
                });
            }
        } catch (error: any) {
            toast.fire({
                icon: "error",
                title: error.response?.data?.message || "An Error Occured!",
            });
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
                    <Link to={"/"}>
                        <MdArrowBack size={28} className="hover:text-blue-500" />
                    </Link>
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Register
                    </h2>

                    <Formik
                        initialValues={{
                            fullName: "",
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
                                        htmlFor="fullname"
                                        className="text-sm font-medium text-gray-700 mb-1"
                                    >
                                        FullName
                                    </label>
                                    <Field
                                        type="fullname"
                                        id="fullname"
                                        name="fullname"
                                        placeholder="Enter your Full Name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-0"
                                    />
                                </div>
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
                                    Register
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
