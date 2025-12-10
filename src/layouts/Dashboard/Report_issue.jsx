import axios from 'axios';
import React, { useState } from 'react';
import { useForm, useWatch } from "react-hook-form"
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../hooks/useRole';
import Loading from '../../components/Loading/Loading';

const Report_issue = () => {
    const { user } = useAuth()
    const { role } = useRole()
    const [Load, setLoad] = useState(false)
    const axiosSecure = useAxiosSecure();
    const { data: Creator = [] } = useQuery({
        queryKey: ['owner-self', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/id`);
            return res.data;
        }
    })
    console.log(Creator)
    const navigate = useNavigate();
    const IssueName = useLoaderData()
    const title = IssueName.map(c => c.name);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm()

    const handleIssues = (data) => {
        setLoad(true)
        console.log(data);
        const profileImg = data.photo[0];
        const formData = new FormData();
        formData.append('image', profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
        axios.post(image_API_URL, formData)
            .then((res) => {
                const photoURL = res.data.data.url;
                const IssueInfo = {
                    photoURL: photoURL,
                    title: data.title,
                    catagory: data.catagory,
                    location: data.location,
                    description: data.description,
                    createdBy: Creator.id,
                    role: role,
                    name: Creator.name
                }
                console.log(IssueInfo)
                axiosSecure.post('/issues', IssueInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Issue Submission done.",
                                icon: "success",
                                draggable: false
                            });
                        }
                        setLoad(false)
                        navigate('/dashboard/my-issue')
                    })

            })


    }

    const titleCatagory = useWatch({ control, name: 'title' });


    const Selectcatagory = (catagoryname) => {
        const catagory = IssueName.find(c => c.name === catagoryname);
        return catagory ? catagory.items : [];
    }

    if (Load) {
        return <Loading />;
    }
    return (
        <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-md">

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-10">
                Create Your Issue
            </h2>

            <form onSubmit={handleSubmit(handleIssues)} className="space-y-6 md:space-y-8">

                {/* Photo Upload */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Upload Photo</span>
                    </label>
                    <input
                        type="file"
                        {...register('photo', { required: true })}
                        className="file-input file-input-bordered w-full"
                    />
                    {errors.photo && (
                        <p className="text-red-500 text-sm mt-1">Photo is required</p>
                    )}
                </div>

                {/* Title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Issue Title</span>
                    </label>
                    <select
                        {...register('title', { required: true })}
                        className="select select-bordered w-full"
                        defaultValue=""
                    >
                        <option disabled value="">Pick your title</option>
                        {title.map((r, i) => (
                            <option key={i} value={r}>{r}</option>
                        ))}
                    </select>
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">title selection is required</p>
                    )}
                </div>

                {/* Category */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Issue Category</span>
                    </label>
                    <select
                        {...register('catagory', { required: true })}
                        className="select select-bordered w-full"
                        defaultValue=""
                    >
                        <option disabled value="">Pick a category</option>
                        {Selectcatagory(titleCatagory).map((r, i) => (
                            <option key={i} value={r}>{r}</option>
                        ))}
                    </select>
                    {errors.catagory && (
                        <p className="text-red-500 text-sm mt-1">catagory selection is required</p>
                    )}
                </div>

                {/* Location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Location</span>
                    </label>
                    <input
                        type="text"
                        {...register('location', { required: true })}
                        placeholder="Enter issue location"
                        className="input input-bordered w-full"
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm mt-1">Location is required</p>
                    )}
                </div>

                {/* Description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Description</span>
                    </label>
                    <textarea
                        {...register('description', { required: true })}
                        placeholder="Write something about your issue"
                        className="textarea textarea-bordered w-full min-h-28"
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">Description is required</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full text-lg py-2 md:py-3"
                >
                    Submit Issue
                </button>

            </form>
        </div>
    );

};

export default Report_issue;