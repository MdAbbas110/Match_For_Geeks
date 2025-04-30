import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";

const signupFormSchema = z.object({
  firstName: z.string().min(3, "First name should be at least 3 characters"),
  lastName: z.string().min(2, "Last name should be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type SignupFormType = z.infer<typeof signupFormSchema>;

interface SignupProps {
  onToggle: () => void;
}

const Signup = ({ onToggle }: SignupProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<SignupFormType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signupFormSchema),
  });

  const { mutate, status } = useMutation({
    mutationFn: async (data: SignupFormType) => {
      const res = await api.post("/signup", {
        firstName: data?.firstName,
        lastName: data.lastName,
        emailId: data.email,
        password: data.password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(addUser(data.data));
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/profile");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response?.status === 409) {
        setError("email", {
          message: "This email is already registered",
        });
      } else {
        setError("root", {
          message: error.response?.data?.message || "Failed to create account",
        });
      }
    },
  });

  const onSubmitForm: SubmitHandler<SignupFormType> = async (data) => {
    mutate(data);
  };

  return (
    <div>
      <section id="SingUpFrom" className="py-16 px-4">
        <div className="max-w-md mx-auto bg-base-100 rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <span className="badge badge-primary badge-lg mb-4">
              Join the Community
            </span>
            <h2 className="text-3xl font-bold">Create Your Account</h2>
            <p className="text-base-content/70 mt-2">
              Connect with other tech enthusiasts today
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="form-control w-full mb-4">
              <label className="label" htmlFor="firstName">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                className={`input input-bordered w-full ${
                  errors.firstName ? "input-error" : ""
                }`}
                {...register("firstName")}
              />
              {errors.firstName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.firstName.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full mb-4">
              <label className="label" htmlFor="lastName">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                className={`input input-bordered w-full ${
                  errors.lastName ? "input-error" : ""
                }`}
                {...register("lastName")}
              />
              {errors.lastName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.lastName.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full mb-4">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email")}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full mb-6">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create a strong password"
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
                {...register("password")}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password.message}
                  </span>
                </label>
              )}
            </div>

            {errors.root && (
              <div className="alert alert-error mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errors.root.message}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={status === "pending"}
            >
              {status === "pending" ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="divider my-6">OR</div>

            <div className="text-center">
              <p className="text-sm mb-4">Already have an account?</p>
              <button
                onClick={onToggle}
                type="button"
                className="btn btn-outline btn-secondary w-full"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Signup;
