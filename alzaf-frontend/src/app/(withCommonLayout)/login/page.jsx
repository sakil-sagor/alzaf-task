import LoginForm from "@/components/FrontendComponent/LoginPageComponent/LoginForm";

const loginPage = () => {
  return (
    <div className="bg-secondary py-5  ">
      <div style={{ height: "calc(100vh - 150px)" }} className="relative">
        <div className="flex justify-center items-start mt-10 h-full absolute w-full z-10">
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
