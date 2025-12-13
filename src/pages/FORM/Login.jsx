import React from 'react';
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const { signInUser, setUser } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const handleLogin = (data) => {
        console.log(data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                setUser(result?.user)
                navigate(location?.state || '/')
                Swal.fire({
                    title: "Successfully login done.",
                    icon: "success",
                    draggable: false
                });
            })
            .catch(error => {
                 const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    text:errorMessage ,
                    title: "Something went wrong!",
            
                });
            })


    }

    return (
        <div className="  min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
            <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-6xl">

                {/* LEFT SIDE – ILLUSTRATION / WELCOME */}
                <div className="hidden md:block px-6">
                    <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
                        Welcome to the Public Issue Reporting Portal
                    </h1>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        Report infrastructure problems such as potholes, streetlight outages, water leakage,
                        and garbage overflow. Track your issues in real time and help make your city cleaner,
                        safer, and more efficient.
                    </p>

                    <div className="border-l-4 border-blue-500 pl-4 text-gray-700 italic">
                        “Your report makes the city better — every issue solved begins with you.”
                    </div>
                </div>

                {/* RIGHT SIDE – FORM */}
                <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
                    <h3 className="text-3xl font-semibold text-center text-gray-800 mb-2">
                        Welcome Back
                    </h3>
                    <p className="text-center text-gray-500 mb-6">Please login to continue</p>

                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                        {/* email */}
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">Email is required</p>
                            )}
                        </div>

                        {/* password */}
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                {...register('password', { required: true, minLength: 6 })}
                                className="input input-bordered w-full"
                                placeholder="Enter your password"
                            />
                            {errors.password?.type === "minLength" && (
                                <p className="text-red-500 text-sm mt-1">
                                    Password must be at least 6 characters
                                </p>
                            )}
                            {errors.password?.type === "required" && (
                                <p className="text-red-500 text-sm mt-1">
                                    Password is required
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between text-sm text-blue-600">
                            <a className="hover:underline cursor-pointer">Forgot password?</a>
                        </div>

                        <button className="btn btn-primary w-full text-white mt-2">
                            Login
                        </button>
                    </form>

                    <div className="text-center mt-5">
                        <p>
                            Don’t have an account?{" "}
                            <Link
                                to="/register"
                                state={location.state}
                                className="text-blue-500 underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>

                    {/* Social login */}
                    <div className="mt-6">
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Login;