import { authModalState } from '@/atoms/authModalAtoms';
import { auth } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type SignupforuserProps = {
    
};

const Signupforuser:React.FC<SignupforuserProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, type: "login" }));
	};
	const [inputs, setInputs] = useState({ email: '', displayName: '', password: '' });
	const router = useRouter();
  
	const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
	  setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
  
	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
	  e.preventDefault();
	  if (!inputs.email || !inputs.password || !inputs.displayName) return alert("Please fill all fields");

	  try {
		toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });

		// Creating a new user
		const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
  
		if (!newUser) return;
		
		  router.push('../Userpage/UserPage');
		
		} catch (error: any) {
			toast.error(error.message, { position: "top-center" });
		} finally {
			toast.dismiss("loadingToast");
		}
	};

	

  
	useEffect(() => {
	  if (error) alert(error.message);
	}, [error]);

    
    return(
        <>
         <div className='second-register'>
        <form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
            
			<h3 className='text-xl font-medium text-white text-center'>Register As User</h3>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Email
				</label>
				<input 
				onChange={handleInput}
					
					type='email'
					name='email'
					id='email'
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
				onChange={handleInput}
					
					type='displayName'
					name='displayName'
					id='displayName'
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
				onChange={handleInput}
					
					type='password'
					name='password'
					id='password'
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
				Register
			</button>

			<div className='text-sm font-medium text-gray-300'>
				Already have an account?{" "}
				<a href='#' className='text-blue-700 hover:underline' onClick={handleClick}>
					Log In
				</a>
			</div>
		</form>
        </div> 
        </>
    );

}
export default Signupforuser;