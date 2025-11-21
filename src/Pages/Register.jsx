import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../Components/ui/SocialLogin"
import axios from "axios";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    

    const handleRegistration = (data) => {
        const profileImg = data.photo[0];


        registerUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);
                //1. store the image in form data
                const formData = new FormData();
                formData.append("image", profileImg);

                //2. send the photo to store and get photo url
                const image_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_Api_Url, formData).then((res) => {
                    // 3. update user profile to firebase
                    const userProfile = {
                        displayName: data.name,
                        photoURL: res.data.data.url
                    };
                    updateUserProfile(userProfile)
                        .then(() => {
                            console.log("user profile updated");
                            navigate(location?.state || "/");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center font-bold mt-4">Welcome to Zap Shift</h3>
            <p className="text-center">Please Register</p>
            <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
                <fieldset className="fieldset">
                    {/* name field  */}
                    <label className="label">Name</label>
                    <input type="text" {...register("name", { required: true })} className="input" placeholder="Name" />
                    {errors.name?.type === "required" && <p className="text-red-500">Name is required.</p>}

                    {/* Photo field  */}
                    <label className="label">Photo</label>
                    <input type="file" {...register("photo", { required: true })} className="file-input" placeholder="Photo" />
                    {errors.photo?.type === "required" && <p className="text-red-500">Photo is required.</p>}

                    {/* email field  */}
                    <label className="label">Email</label>
                    <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === "required" && <p className="text-red-500">Email is required.</p>}

                    {/* password field  */}
                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/ })}
                        className="input"
                        placeholder="Password"
                    />

                    {/* password validation error message*/}
                    {errors.password?.type === "required" && <p className="text-red-500">Password is required.</p>}
                    {errors.password?.type === "minLength" && <p className="text-red-500">Password must be 6 characters or longer</p>}
                    {errors.password?.type === "pattern" && (
                        <p className="text-red-500">Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters</p>
                    )}

                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p className="text-center">
                    Already have an account ?{" "}
                    <Link to="/login" state={location.state} className="link link-hover text-blue-500">
                        Login
                    </Link>
                </p>
                <div className="divider mb-0">OR</div>
            </form>
            <SocialLogin page="register"></SocialLogin>
        </div>
    );
};

export default Register;
