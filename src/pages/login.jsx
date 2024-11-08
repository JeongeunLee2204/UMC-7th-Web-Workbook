import "./login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required(),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("email", data.email);

      navigate("/main");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="container">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email")}
          placeholder="이메일을 입력해주세요!"
          className="loginInput"
        />
        <p style={{ color: "red" }}>{errors.email?.message}</p>
        <input
          type="password"
          {...register("password")}
          placeholder="비밀번호를 입력해주세요!"
          className="loginInput"
        />
        <p style={{ color: "red" }}>{errors.password?.message}</p>
        <input type="submit" className="loginBtn" />
      </form>
    </div>
  );
};

export default Login;
