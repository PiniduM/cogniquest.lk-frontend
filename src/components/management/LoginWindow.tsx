import FormLayout from "@/src/layouts/FormLayout";
import React, { SetStateAction } from "react";
import CustomInput from "../global/Inputs/CustomInput";
import axios, { AxiosError } from "axios";
import { setCookie } from "cookies-next";
import SubmitButton from "../global/Buttons/SubmitButton";

interface IProps {
  setManagementToken: React.Dispatch<SetStateAction<string>>;
}

const LoginWindow = ({ setManagementToken }: IProps) => {
  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const username = form.username.value;
    const password = form.password.value;

    if (!(username && password)) {
      alert("fill all fields");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/management/give_management_token`;
    const data = { username, password };
    try {
      const response = await axios.post(url, data);
      const { managementToken } = response.data;
      if (managementToken) {
        setManagementToken(managementToken);
        setCookie("management_token", managementToken);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      alert(error.response?.data || "somthing went wrong");
    }
  };

  return (
    <FormLayout title="Management Login">
      <form
        onSubmit={handleSubmit}
        className="p-4 max-w-[90%] m-auto flex flex-col items-center gap-5"
      >
        <CustomInput name="username" type="text" label="Username" />
        <CustomInput name="password" type="text" label="Password" />
        <SubmitButton>Login</SubmitButton>
      </form>
    </FormLayout>
  );
};

export default LoginWindow;
