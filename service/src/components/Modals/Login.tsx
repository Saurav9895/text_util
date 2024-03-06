import { authModalState } from '@/atoms/authModalAtoms';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Loginforuser from './Loginforuser';


type LoginProps = {
    
};

const Login: React.FC<LoginProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = (type: "login" | "register" | "forgotPassword") => {
		setAuthModalState((prev) => ({ ...prev, type }));
	};
	const [inputs, setInputs] = useState({ serviceemail: "", servicepassword: "" });
	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
	const router = useRouter();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.serviceemail || !inputs.servicepassword) return alert("Please fill all fields");
		try {
			const newUser = await signInWithEmailAndPassword(inputs.serviceemail, inputs.servicepassword);
			if (!newUser) return;
			router.push("/");
		} catch (error: any) {
					toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
		}
	};

	useEffect(() => {
		if (error) alert(error.message);
	},[error])
    
    return(
        <div className='flex items-center justify-center h-[calc(100vh-5rem)] select-none'>
		<div className='first-register'>
		<form className='space-y-6 px-6 pb-4' onSubmit={handleLogin}>
			<h3 className='text-xl font-medium text-white text-center'>Sign in As Service Person</h3>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Your Email
				</label>
				<input
					onChange={handleChange}
					type='email'
					name='serviceemail'
					id='serviceemail'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='name@company.com'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Your Password
				</label>
				<input
				onChange={handleChange}
					type='password'
					name='servicepassword'
					id='servicepassword'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='*******'
				/>
			</div>

			<button
				type='submit'
				className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
            '
			>
				{loading ? "Loading..." : "Log In"}
			</button>
			<button className='flex w-full justify-end' onClick={() => handleClick("forgotPassword")}>
				<a href='#' className='text-sm block text-brand-orange hover:underline w-full text-right'>
					Forgot Password?
				</a>
			</button>
			<div className='text-sm font-medium text-gray-300'>
				Not Registered?{" "}
				<a href='#' className='text-blue-700 hover:underline' onClick={() => handleClick("register")}>
					Create account
				</a>
			</div>
		</form>
		</div>
		<Loginforuser/>
		</div>
    );
}
export default Login;