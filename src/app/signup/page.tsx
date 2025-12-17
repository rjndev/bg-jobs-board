"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/authHooks";

export default function SignupPage() {
	const router = useRouter();
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		drNumber: "",
	});
	const [error, setError] = useState<string | null>(null);
	const { handleSignup, fetching } = useAuth();

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		const result = await handleSignup({
			firstName: form.firstName,
			lastName: form.lastName,
			email: form.email,
			password: form.password,
			drNumber: form.drNumber,
		});

		if (!result.ok) {
			setError(result.message || "Signup failed");
			return;
		}

		router.push("/login");
	}

	return (
		<div className="flex">
			<form onSubmit={onSubmit} className="flex flex-1 flex-col gap-4 items-center justify-center min-h-screen p-6">
				<Image className="lg:hidden block" src="/bg-logo.svg" alt="Blugibbon Logo" width={200} height={100} />
				<h1 className="font-bold text-4xl mt-8 mb-4">Join as a Doctor</h1>
				<h2 className="text-lg text-center">Create your account to find your next locum role.</h2>

				<div className="flex-col grid grid-rows-5 gap-4 mt-4 w-full max-w-md">
					<span className="flex gap-4 items-center justify-between">
						<label htmlFor="firstName" className="font-semibold text-lg">First Name</label>
						<input
							id="firstName"
							name="firstName"
							value={form.firstName}
							onChange={onChange}
							className="border border-gray-300 rounded-md py-1 px-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500 outline-none w-2/3"
							required
						/>
					</span>

					<span className="flex gap-4 items-center justify-between">
						<label htmlFor="lastName" className="font-semibold text-lg">Last Name</label>
						<input
							id="lastName"
							name="lastName"
							value={form.lastName}
							onChange={onChange}
							className="border border-gray-300 rounded-md py-1 px-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500 outline-none w-2/3"
							required
						/>
					</span>

					<span className="flex gap-4 items-center justify-between">
						<label htmlFor="email" className="font-semibold text-lg">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={form.email}
							onChange={onChange}
							className="border border-gray-300 rounded-md py-1 px-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500 outline-none w-2/3"
							required
						/>
					</span>

					<span className="flex gap-4 items-center justify-between">
						<label htmlFor="password" className="font-semibold text-lg">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							value={form.password}
							onChange={onChange}
							minLength={8}
							className="border border-gray-300 rounded-md py-1 px-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500 outline-none w-2/3"
							required
						/>
					</span>

					<span className="flex gap-4 items-center justify-between">
						<label htmlFor="drNumber" className="font-semibold text-lg">DR Number</label>
						<input
							id="drNumber"
							name="drNumber"
							value={form.drNumber}
							onChange={onChange}
							className="border border-gray-300 rounded-md py-1 px-2 transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500 outline-none w-2/3"
							required
						/>
					</span>
				</div>

				<p className={`${error ? "text-red-500" : "hidden"}`}>{error}</p>

				<button
					className="bg-blue-600 flex items-center justify-center text-white rounded-md mt-4 py-1 px-4 w-[140px] h-[44px] font-semibold hover:cursor-pointer hover:bg-blue-500 transition-colors duration-300 ease-in-out disabled:bg-gray-500"
					disabled={fetching}
					type="submit"
				>
					{fetching ? "Signing up..." : "Create Account"}
				</button>
			</form>

			<div className="bg-linear-to-r from-cyan-300 to-blue-400 w-full lg:block hidden flex-1 flex-col justify-center items-center">
				<div className="flex items-center justify-center flex-col h-full">
					<Image className="lg:block hidden" src="/bg-logo.svg" alt="Blugibbon Logo" width={420} height={220} />
					<h2 className="p-8 text-2xl text-blue-900">Welcome to our Locum Mailer!</h2>
					<p className="text-blue-900 p-8 text-xl">Sign up to get started.</p>
				</div>
			</div>
		</div>
	);
}
