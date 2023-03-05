
import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const EditPage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [userData, setUserData] = useState({});

    // generating the suitable URL according to API..
    const userID = location.state.userId;
    let myArray = location.state.tableId.split("/");
    const tableID = myArray.pop();

    myArray.push("find", tableID, userID);
    const getURL = myArray.join("/");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();



    useEffect( () => {

        const getContact = async () => {

            const response = await axios.get(`${getURL}`);
            const {data} = response

            setUserData(data.msg)
        }

        getContact();

    }, []);


    const updateContact = async (data) =>{
        myArray.pop();
        myArray.pop();
        myArray.pop();
        myArray.push('update', tableID, userID);
        const updateURL = myArray.join("/");

        // Set the default header with the token from localStorage
        axios.defaults.headers.common['x-auth-token'] = `Bearer ${localStorage.getItem('token')}`;
        
        const res = await axios.patch(`${updateURL}`, data)
        if(res.data.status === 'successful' ){
            navigate(-1);
        }
        else{
            alert(res.data.Error);
        }
    }

    const onSubmit = async (data) => {

        await updateContact(data);
        reset();
    };



    return (
        <div className="edit-page">

            <div className="form">
                <div className="title"> Update Contact </div>
                <div className="subtitle"> Change your contact details </div>



                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-container ic1">
                        <input id="firstName" name="firstName" className="input" type="text" placeholder=" " defaultValue={userData.firstName} {...register("firstName", {
                            required: true
                        })}/>
                        <div className="cut"></div>
                        <label htmlFor="firstName" className="placeholder"> First name </label>

                    </div>
                    {errors.firstName && errors.firstName.type === "required" && (
                        <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} > Field is required.</p>
                    )}



                    <div className="input-container ic2">
                        <input id="lastName" name="lastName" className="input" type="text" placeholder=" " defaultValue={userData.lastName} {...register("lastName", {
                            required: true
                        })}/>
                        <div className="cut"></div>
                        <label htmlFor="lastName" className="placeholder"> Last name </label>

                    </div>
                    {errors.lastName && errors.lastName.type === "required" && (
                        <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} > Field is required.</p>
                    )}



                    <div className="input-container ic2">
                        <input id="age" name="age" className="input" type="number" placeholder=" " defaultValue={userData.age} {...register("age", {
                            required: "Age is required.",
                            min: {value: 0, message: "age must be at least 0"},
                            max: {value: 150, message: "age must be no more than 150"},
                        })}/>
                        <div className="cut"></div>
                        <label htmlFor="age" className="placeholder"> Age </label>

                    </div>
                    {errors.age && <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} >{errors.age.message}</p>}
                  

                    <div className="input-container ic2">
                        <input id="email" name="email" className="input" type="text" placeholder=" " defaultValue={userData.email} {...register("email", {
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
                        <label htmlFor="gender" className="input" >Gender</label>

                        <select className="form-select" aria-label="Default select example" controlid="gender" {...register("gender", {
                            required: "Please select your gender"
                        })}>
                            <option value={userData.gender} defaultValue={userData.gender}>{userData.gender}</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                            <option value="Not Comfortable">Not Comfortable</option>
                        </select>
                        
                    </div>
                    {errors.gender && errors.gender.type === "required" && (
                        <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} > Field is required.</p>
                    )}


                    <label></label>
                    {/* <button type="text" className="submit">Update</button> */}

                    <div className="flex items-center justify-center">
                        <button className="submit bg-green-500 hover:bg-green-400 text-slate-100 font-semibold py-2 px-8 rounded-l">
                            Update
                        </button>
                        <button onClick={() => navigate(-1) } className="bg-red-500 hover:bg-red-400 text-slate-100 font-semibold py-2 px-8 rounded-r ml-2">
                            Cancle
                        </button>
                    </div>
                    
                </form>

            </div>

        </div>
    )
}

export default EditPage;

