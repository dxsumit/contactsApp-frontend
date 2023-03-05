
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({onAuthStateChange, setTableId}) => {

    const navigate = useNavigate();
    const baseURL = "https://ivykids.ced19i028sumit.repl.co";

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();



    const onSubmit = async (formData) => {


        try {

            const res = await axios.post(`${baseURL}/auth/login`, formData);
            // console.log(res.data);
            reset();

            onAuthStateChange(true);
            setTableId(`${baseURL}/${res.data.id}`);
            navigate('/');

            // Set the token in localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('tableID', `${baseURL}/${res.data.id}`);

        }
        catch(err){
            if(err.response.status === 401){
                alert("Wrong Credentials.");
            }
        }
        
    };


    return (
        <div className="login-page">

            <div className="form">
                <div className="title"> Login Page </div>
                <div className="subtitle"> Good to see you again </div>



                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-container ic1">
                        <input id="username" name="username" className="input" type="text" placeholder=" " {...register("username", {
                            required: true
                        })}/>
                        <div className="cut"></div>
                        <label htmlFor="username" className="placeholder"> Username </label>

                    </div>
                    {errors.username && errors.username.type === "required" && (
                        <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} >username is required.</p>
                    )}

                    <div className="input-container ic2">
                        <input id="password" name="password" className="input" type="text" placeholder=" " {...register("password", {
                            required: "Password is required.",
                            minLength: {
                                value: 6,
                                message: "Password should be at-least 6 characters."
                            }

                        })} />
                        <div className="cut"></div>
                        <label htmlFor="password" className="placeholder"> Password </label>
                    </div>

                    {errors.password && (
                        <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} >{errors.password.message}</p>
                    )}


                    <label></label>
                    <button type="text" className="mySubmit">LOGIN</button>
                    
                </form>

            </div>

        </div>
    )
}

export default Login;

