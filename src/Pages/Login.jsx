import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../Components/ui/SocialLogin";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();


    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);
                navigate(location?.state || "/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center font-bold mt-4">Welcome Back</h3>
            <p className="text-center">Login With Zap Shift</p>
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                <fieldset className="fieldset">
                    {/* email field  */}
                    <label className="label">Email</label>
                    <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />

                    {errors.email?.type === "required" && <p className="text-red-500">Email is required.</p>}

                    {/* password field  */}
                    <label className="label">Password</label>
                    <input type="password" {...register("password", { required: true })} className="input" placeholder="Password" />

                    {errors.password?.type === "required" && <p className="text-red-500">Password is required.</p>}
                    {}

                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>

                <p className="">
                    New to Zap Shift ? {" "}
                    <Link to="/register" state={location.state} className="link link-hover text-blue-500">
                        Create an account
                    </Link>     
                </p>
                <div className="divider mb-0">OR</div>
            </form>
            <SocialLogin page="login"></SocialLogin>
        </div>
    );
};

export default Login;
