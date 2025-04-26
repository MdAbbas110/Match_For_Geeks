import { z } from "zod";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const loginFormSchema = z.object({
  email: z.string().email("Invalid Email ID"),
  password: z.string().min(4, "Choose a strong password"),
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormInput) => {
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        navigate("/");
      } else {
        // If API returns success: false, show error message
        setError("root", {
          type: "manual",
          message: data.message || "Login failed",
        });
      }
    },
    onError: (error: any) => {
      setError("root", {
        type: "manual",
        message: "Something went wrong, please try again.",
      });
    },
  });

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card w-96 bg-base-100 shadow-sm">
        <div className="card-body">
          <span className="badge badge-xs badge-warning">Find Your Match</span>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Existing User</h2>
          </div>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="mt-4" htmlFor="email">
              Email ID
            </label>
            <label className="input validator my-2">
              {/* SVG omitted for brevity */}
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                placeholder="mail@site.com"
              />
            </label>
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}

            <label htmlFor="password">Password</label>
            <label className="input validator my-2">
              {/* SVG omitted for brevity */}
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Please enter a valid password",
                })}
              />
            </label>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            {/* Show root error message */}
            {errors.root && (
              <p className="text-red-600 mt-2">{errors.root.message}</p>
            )}

            <div className="mt-6">
              <button
                className="btn btn-primary btn-block"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
