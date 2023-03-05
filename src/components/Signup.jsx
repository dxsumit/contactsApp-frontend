
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({onAuthStateChange, setTableId}) => {

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

            // console.log(formData);

            const res = await axios.post(`${baseURL}/auth/signup`, formData);
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
            if(err.response.status === 400){
                alert("Wrong Credentials.");
            }
            console.log(err)
        }
        
    };



    return (
        <div className="signup-page">

            <div className="form">
                <div className="title"> SignUP Page </div>
                <div className="subtitle"> Welcome ! Create you account. </div>



                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-container ic1">
                        <input id="firstName" name="firstName" className="input" type="text" placeholder=" " {...register("firstName", {
                            required: true
                        })}/>
                        <div className="cut"></div>
                        <label htmlFor="firstName" className="placeholder"> First name </label>

                    </div>
                    {errors.firstName && errors.firstName.type === "required" && (
                        <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} > Field is required.</p>
                    )}



                    <div className="input-container ic2">
                        <input id="lastName" name="lastName" className="input" type="text" placeholder=" " {...register("lastName", {
                            required: true
                        })}/>
                        <div className="cut"></div>
                        <label htmlFor="lastName" className="placeholder"> Last name </label>

                    </div>
                    {errors.lastName && errors.lastName.type === "required" && (
                        <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} > Field is required.</p>
                    )}



                    <div className="input-container ic2">
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
                        <input id="email" name="email" className="input" type="text" placeholder=" " {...register("email", {
                            required: "Email is required.",
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: "Email is not valid."
                            }
                        })}/>
                        <div className="cut"></div>
                        <label htmlFor="email" className="placeholder"> Email </label>

                    </div>
                    {errors.email && <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} >{errors.email.message}</p>}
                    


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
                    <button type="text" className="mySubmit">Signup</button>
                    
                </form>

            </div>

        </div>
    )
}

export default Signup;

