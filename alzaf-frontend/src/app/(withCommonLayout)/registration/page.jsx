
import RegistrationForm from "./RegistrationForm";

const registrationPage = () => {
    return (
        <div className="bg-secondary py-5 pt-20 " >
          <div style={{ height: "calc(100vh - 150px)" }} className="relative">
            <div className="flex justify-center items-center h-full absolute w-full z-10">
              <RegistrationForm></RegistrationForm>
            </div>
          </div>
          
        </div>
      );
    };
    
export default registrationPage;