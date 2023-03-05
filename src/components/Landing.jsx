
import { Link } from "react-router-dom";

const LandingPage = () => {

    return (
        
        <div className="flex justify-center items-center h-screen bg-sky-50">
            <Link to="/login" >
                <div className="bg-blue-500 text-white p-8">
                    <h1 className="text-3xl font-bold mb-4">Login</h1>
                    <p>Already have account</p>
                </div>
            </Link>

            <Link to="/signup" >
            <div className="bg-teal-500 text-white p-8 ml-8">
                <h1 className="text-3xl font-bold mb-4">Signup</h1>
                <p>Create new account</p>
            </div>
            </Link>

        </div>



    )
}

export default LandingPage;

