import { useForm, SubmitHandler } from "react-hook-form";

type Input = {
  email: string;
  password: string;
};

const EMAIL_VALIDATE_PATTERN =
  /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

const extractXsrfTokenFromCookie = (): string | null => {
  const xsrfTokenCookie = document.cookie
    .split("; ")
    .find((param) => param.startsWith("XSRF-TOKEN"));
  if (xsrfTokenCookie === undefined) return null;
  return decodeURIComponent(xsrfTokenCookie.replace("XSRF-TOKEN=", ""));
};

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    });
    const token = extractXsrfTokenFromCookie();
    if (token === null) {
      alert("認証に必要なTokenが取得できなかった");
      return;
    }

    try {
      await fetch("http://localhost:8000/login", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      console.log(
        await fetch("http://localhost:8000/api/user", {
          mode: "cors",
          credentials: "include",
        })
      );
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="lg:container shadow-md flex flex-col px-8 pt-6 pb-8 bg-white mx-auto text-left rounded-xl shadow-slate-400 ">
      <h1 className="text-4xl mb-4">ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block font-bold mb-2 text-sm">Email address</label>
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
        <input
          className="text-white hover:text-black w-full block rounded py-2 px-3 mt-3 font-bold bg-blue-400 hover:bg-green-300 cursor-pointer"
          type="submit"
          value="ログイン"
        />
      </form>
    </div>
  );
};
