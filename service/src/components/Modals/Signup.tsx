import { authModalState } from '@/atoms/authModalAtoms';
import { auth } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Signupforuser from './Signupforuser';


type SignupProps = {
    
};

const Signup:React.FC<SignupProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, type: "login" }));
	};
	const [inputs, setInputs] = useState({ serviceemail: '', servicedisplayName: '', servicepassword: '' });
	const router = useRouter();
  
	const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
	  setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
  
	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
	  e.preventDefault();
	  if (!inputs.serviceemail || !inputs.servicepassword || !inputs.servicedisplayName) return alert("Please fill all fields");

	  try {
		toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });

		// Creating a new user
		const newUser = await createUserWithEmailAndPassword(inputs.serviceemail, inputs.servicepassword);
  
		if (!newUser) return;
		
		  router.push('/');
		
		} catch (error: any) {
			toast.error(error.message, { position: "top-center" });
		} finally {
			toast.dismiss("loadingToast");
		}
	};

	

  
	useEffect(() => {
	  if (error) alert(error.message);
	}, [error]);


	
    return (
        
        <div className='flex items-center justify-center h-[calc(100vh-5rem)] select-none'>
            <div className='first-register'>
        <form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
			<h3 className='text-xl font-medium text-white text-center'>Register As Service Person</h3>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Email
				</label>
				<input 
				onChange={handleChangeInput}
					
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
				<label htmlFor='displayName' className='text-sm font-medium block mb-2 text-gray-300'>
					Display Name
				</label>
				<input 
				onChange={handleChangeInput}
					
					type='displayName'
					name='servicedisplayName'
					id='servicedisplayName'
					className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
					placeholder='John Doe'
				/>
			</div>
			<div>
				<label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
					Password
				</label>
				<input 
				onChange={handleChangeInput}
					
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
				{loading ? "Registering..." : "Register"}
			</button>

			<div className='text-sm font-medium text-gray-300'>
				Already have an account?{" "}
				<a href='#' className='text-blue-700 hover:underline' onClick={handleClick}>
					Log In
				</a>
			</div>
		</form>
        </div>
        <Signupforuser/>
        
        </div>
    );
}
export default Signup;