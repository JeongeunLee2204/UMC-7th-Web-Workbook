import "./login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUp = () => {
  const schema = yup.object().shape({
    email: yup
      .string("이메일은 문자열이어야 합니다.")
      .email()
      .required("이메일을 반드시 입력해주세요."),
    password: yup
      .string("비밀번호는 문자열이어야 합니다.")
      .required("비밀번호를 반드시 입력해주세요.")
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다."),
    passwordCheck: yup
      .string("비밀번호는 문자열이어야 합니다.")
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호를 다시 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("폼 데이터 제출");
    console.log(data);
  };

  return (
    <div className="container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type={"email"}
          {...register("email")}
          placeholder="이메일을 입력해주세요!"
          className="loginInput"
        />
        <p style={{ color: "red" }}>{errors.email?.message}</p>
        <input
          type={"password"}
          {...register("password")}
          placeholder="비밀번호를 입력해주세요!"
          className="loginInput"
        />
        <p style={{ color: "red" }}>{errors.password?.message}</p>
        <input
          type={"password"}
          {...register("passwordCheck")}
          placeholder="비밀번호를 다시 입력해주세요!"
          className="loginInput"
        />
        <p style={{ color: "red" }}>{errors.passwordCheck?.message}</p>
        <input type={"submit"} className="loginBtn" />
      </form>
    </div>
  );
};

export default SignUp;
