import { Form } from "@remix-run/react";
import Button from "../form/button";
import Checkbox from "../form/checkbox";
import InputField from "../form/inputField";
import Logo from "../logo";

function Login() {
  const inputFieldDetails = [
    {
      label: "Email",
      placeholder: "Enter Email",
      type: "text",
      name: "email",
      required: true,
    },
    {
      label: "Password",
      placeholder: "Enter Password",
      type: "password",
      name: "password",
      required: true,
    },
  ];
  return (
    <div className="z-10 flex	 min-h-[480px] w-full max-w-[554px] flex-col items-center justify-center rounded-2xl bg-white px-24 drop-shadow-xl">
      <div className="z-20 -mt-24 mb-6">
        <Logo />
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900">
          Sign in to your account
        </h1>
        <div className="flex justify-center">
          <hr className="mt-7 mb-5 h-px w-6/12 border-none bg-gray-500 text-center" />
        </div>
        <Form method="post" noValidate>
          <div className="flex flex-col gap-6">
            {inputFieldDetails.map((detail, index) => {
              return <InputField {...detail} key={index} />;
            })}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <Checkbox />
            </div>
            <div className="cursor-pointer text-center text-xs text-indigo-600">
              Forget your password?
            </div>
          </div>
          <div className="mt-6">
            <Button buttonText="Sign in" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
