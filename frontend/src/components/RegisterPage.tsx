import { useForm, SubmitHandler } from "react-hook-form";

type Input = {
  email: string;
  password: string;
};

const EMAIL_VALIDATE_PATTERN =
  /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue=""
        {...register("email", {
          required: true,
          pattern: EMAIL_VALIDATE_PATTERN,
        })}
      />
      {errors.email && "emailは必須です"}
      <input
        type="password"
        {...register("password", {
          required: true,
          maxLength: 64,
          minLength: 16,
        })}
      />
      {errors.email && "passwordは必須です"}
      {errors.email?.type === "maxLength" &&
        "passwordは64文字以下である必要があります"}
      {errors.email?.type === "minLength" &&
        "passwordは16文字以上である必要があります"}
      <input type="submit" value="登録" />
    </form>
  );
};
