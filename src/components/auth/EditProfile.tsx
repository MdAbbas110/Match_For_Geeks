import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { api } from "../../lib/axios";
import UserCard from "../UserCard";
import { Profile } from "../Feed";

const profileFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  age: z.string().min(1, "Age is required"),
  photoUrl: z.string().url("Please enter a valid URL").optional(),
  about: z.string().min(15, "About should be descriptive"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select your gender",
  }),
});

type ProfileFormInput = z.infer<typeof profileFormSchema>;

const EditProfile = () => {
  const user = useSelector((store: RootState) => store.user);
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ProfileFormInput>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      age: user?.age || "",
      photoUrl: user?.photoUrl || "",
      about: user?.about || "",
      gender: (user?.gender as "male" | "female" | "other") || "other",
    },
    resolver: zodResolver(profileFormSchema),
  });

  const { mutate, isPending, status } = useMutation({
    mutationFn: async (data: ProfileFormInput) => {
      const response = await api.patch("/profile/edit", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      } else {
        setError("root", {
          type: "manual",
          message: data.message || "Failed to update profile",
        });
      }
    },
    onError: () => {
      setError("root", {
        type: "manual",
        message: "Something went wrong, please try again.",
      });
    },
  });

  const onSubmit: SubmitHandler<ProfileFormInput> = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center my-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="card w-96 bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="text-3xl font-bold">Edit Profile</h2>
              <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="input input-bordered"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-red-500">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="input input-bordered"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-red-500">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="age">
                    Age
                  </label>
                  <input
                    type="text"
                    id="age"
                    className="input input-bordered"
                    {...register("age")}
                  />
                  {errors.age && (
                    <p className="text-red-500">{errors.age.message}</p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="select select-bordered"
                    {...register("gender")}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500">{errors.gender.message}</p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="photoUrl">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    id="photoUrl"
                    className="input input-bordered"
                    {...register("photoUrl")}
                  />
                  {errors.photoUrl && (
                    <p className="text-red-500">{errors.photoUrl.message}</p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="about">
                    About
                  </label>
                  <textarea
                    id="about"
                    className="textarea textarea-bordered h-24"
                    placeholder="Tell us about yourself..."
                    {...register("about")}
                  />
                  {errors.about && (
                    <p className="text-red-500">{errors.about.message}</p>
                  )}
                </div>

                {errors.root && (
                  <p className="text-red-500 mt-2">{errors.root.message}</p>
                )}

                {status === "success" && (
                  <div className="toast toast-end">
                    <div className="alert alert-success">
                      <span>Profile Information Updated.</span>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={isPending}
                  >
                    {isPending ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {user && (
            <div className="card w-96 bg-base-100 shadow-sm mt-12">
              <h2 className="text-xl font-bold underline mb-4">Card Preview</h2>
              <UserCard
                profileData={
                  {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    photoUrl: user.photoUrl,
                    about: user.about || "",
                    age: user.age,
                    gender: user.gender || "other",
                  } as Profile
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
