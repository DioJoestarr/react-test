import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import FormInput from "../ui/AppFormInput/FormInput";
import instance from "../utils/instance";
import { ApiResponse } from "../types/api";
import { UserAuthData } from "../types/user";
import { useSetUser } from "../store/UserStore";
import JwtService from "../services/JwtService";
import { Container } from "react-bootstrap";

type LoginFormType = {
  id: string;
  name: string;
  company_id: number;
};
//báo lỗi These credentials do not match our records nên không dùng được, phải gán cứng jwt
function Login() {
  const setUser = useSetUser();
  const { register, control } = useForm<LoginFormType>({
    defaultValues: {
      id: "0869017747",
      name: "Phát",
      company_id: 9,
    },
  });
  const handleLogin = async () => {
    instance
      .post<LoginFormType, ApiResponse<UserAuthData>>("/sign-up-zalo")
      .then(({ data }) => {
        JwtService.setToken(data.token);
        setUser(data);
      });
  };
  return (
    <Container>
      <Form
        className="d-block m-auto mt-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h4 className=" fw-bold">Đăng nhập để lấy jwt</h4>
        <FormInput
          control={control}
          label="Số điện thoại"
          {...register("id")}
        />
        <FormInput control={control} label="Tên" {...register("name")} />
        <Button variant="primary" className="mt-3" type="submit">
          Đăng nhập
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
