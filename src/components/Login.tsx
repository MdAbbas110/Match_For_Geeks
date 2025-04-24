import { z } from "zod";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/userSlice";
import { BASE_URL } from "../utils/constants";

const loginFormSchema = z.object({
  email: z.string().email("Invalid Email ID"),
  password: z.string().min(4, "Choose a strong password"),
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

const Login = () => {
  const dispatch = useDispatch();
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

  const postLoginData = async (data: LoginFormInput) => {
    try {
      const login = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(login.data.userInfo));
      return navigate("/");
    } catch (error: any) {
      setError("root", error);
    }
  };

  const mutation = useMutation({
    mutationFn: postLoginData,
    onSuccess: (data) => {
      console.log({
        success: true,
        data,
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
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
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
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
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
            {errors.root && <p>{errors.root.message}</p>}
            <div className="mt-6">
              <button className="btn btn-primary btn-block">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
