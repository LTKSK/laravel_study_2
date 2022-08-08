import { useForm, SubmitHandler } from "react-hook-form";

type Input = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const EMAIL_VALIDATE_PATTERN =
  /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    }).then(console.log);
    console.log(document.cookie);

    try {
      const resp = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.passwordConfirmation,
        }),
      });
      console.log(resp);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="lg:container shadow-md flex flex-col px-8 pt-6 pb-8 bg-white mx-auto text-left rounded-xl shadow-slate-400 ">
      <h1 className="text-4xl mb-4">新規登録</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label>Name</label>
          <input
            className="shadow borderd rounded appearance-none w-full py-2 px-3"
            placeholder="enter your name"
            type="text"
            defaultValue=""
            {...register("name", {
              required: true,
              maxLength: 32,
              minLength: 4,
            })}
          />
        </div>
        <p className="text-red-600">{errors.name && "nameは必須です"}</p>
        <p className="text-red-600">
          {errors.name?.type === "maxLength" &&
            "nameは32文字以下である必要があります"}
        </p>
        <p className="text-red-600">
          {errors.name?.type === "minLength" &&
            "nameは4文字以上である必要があります"}
        </p>

        <div className="mb-4">
          <label>Email address</label>
          <input
            className="shadow borderd rounded appearance-none w-full py-2 px-3"
            placeholder="enter your email address"
            type="email"
            defaultValue=""
            {...register("email", {
              required: true,
              pattern: EMAIL_VALIDATE_PATTERN,
            })}
          />
        </div>
        <p className="text-red-600">{errors.email && "emailは必須です"}</p>

        <div className="mb4">
          <label>Password</label>
          <input
            className="shadow borderd rounded appearance-none w-full py-2 px-3"
            placeholder="enter your password"
            type="password"
            {...register("password", {
              required: true,
              maxLength: 64,
              minLength: 8,
            })}
          />
        </div>
        <p className="text-red-600">
          {errors.password && "passwordは必須です"}
        </p>
        <p className="text-red-600">
          {errors.password?.type === "maxLength" &&
            "passwordは64文字以下である必要があります"}
        </p>
        <p className="text-red-600">
          {errors.password?.type === "minLength" &&
            "passwordは8文字以上である必要があります"}
        </p>

        <div className="mb4">
          <label>Password確認</label>
          <input
            className="shadow borderd rounded appearance-none w-full py-2 px-3"
            placeholder="enter your password"
            type="password"
            {...register("passwordConfirmation", {
              required: true,
              maxLength: 64,
              minLength: 8,
            })}
          />
        </div>
        <p className="text-red-600">
          {errors.passwordConfirmation && "passwordは必須です"}
        </p>
        <p className="text-red-600">
          {errors.passwordConfirmation?.type === "maxLength" &&
            "passwordは64文字以下である必要があります"}
        </p>
        <p className="text-red-600">
          {errors.passwordConfirmation?.type === "minLength" &&
            "passwordは8文字以上である必要があります"}
        </p>

        <input
          className="text-white hover:text-black w-full block rounded py-2 px-3 mt-3 font-bold bg-blue-400 hover:bg-green-300 cursor-pointer"
          type="submit"
          value="登録"
        />
      </form>
    </div>
  );
};
