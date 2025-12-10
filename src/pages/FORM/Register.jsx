import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import Swal from 'sweetalert2'
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Register = () => {
    const axiosSecure = useAxiosSecure();
    const { registerUser, updateUserProfile } = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleRegister = (data) => {
        const profileImg = data.photo[0];
        console.log(data);


        registerUser(data.email, data.password)
            .then(() => {

                const formData = new FormData();
                formData.append('image', profileImg);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;
                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: "Successfully registration done.",
                                        icon: "success",
                                        draggable: false
                                    });
                                }
                            })


                        // update user profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                navigate(location.state || '/');
                            })
                            .catch(error => {
                                const errorMessage = error.message;
                                Swal.fire({
                                    icon: "error",
                                    text: errorMessage,
                                    title: "Something went wrong!",

                                });
                            })
                    })

            })
            .catch(error => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    text: errorMessage,
                    title: "Something went wrong!",

                });
            })





    }
    return (
        <div className=" my-10 pt-10 min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
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
                    <p className="text-center text-gray-500 mb-6">Please register to continue</p>

                    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

                        {/* name */}
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Enter your name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">Name is required</p>
                            )}
                        </div>


                        {/* photo */}

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Photo</label>
                            <input
                                type="file"
                                {...register('photo', { required: true })}
                                className=" file-input input-bordered w-full"
                            />
                            {errors.photo && (
                                <p className="text-red-500 text-sm mt-1">Photo is required</p>
                            )}
                        </div>



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
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                                })}
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
                            {
                                errors.password?.type === 'pattern' && <p className='text-red-500 text-sm mt-1 '>Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters</p>
                            }
                        </div>

                        <div className="flex justify-between text-sm text-blue-600">
                            <a className="hover:underline cursor-pointer">Forgot password?</a>
                        </div>

                        <button className="btn btn-primary w-full text-white mt-2">
                            Register
                        </button>
                    </form>

                    <div className="text-center mt-5">
                        <p>
                            Have any account?{" "}
                            <Link
                                to="/login"
                                state={location.state}
                                className="text-blue-500 underline"
                            >
                                Login
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

export default Register;