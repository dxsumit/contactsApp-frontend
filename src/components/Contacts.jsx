
import axios from "axios";
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Contacts = ({tableId, onAuthStateChange}) => {

    const [tableData, setTableData] = useState([])
    
    // to update page after delete operation...
    const [counter, setCounter] = useState(0)
    const navigate = useNavigate();

    const deleteContact = async (userId) => {
        try {

            let myArray = tableId.split("/");
            const tableID = myArray.pop();
            myArray.push("delete", tableID,userId)
            const finalURL = myArray.join("/");

            // Set the default header with the token from localStorage
            axios.defaults.headers.common['x-auth-token'] = `Bearer ${localStorage.getItem('token')}`;

            const res = await axios.delete(`${finalURL}`);
            if(res.data.status === 'successful' ){
                setCounter(counter+1);
            }
            else{
                alert(res.data.Error);
            }

        }
        catch(err){
            console.log(err);
        }
    }

    useEffect( () => {

        const getAllContacts = async () => {

            // Set the default header with the token from localStorage
            axios.defaults.headers.common['x-auth-token'] = `Bearer ${localStorage.getItem('token')}`;

            const response = await axios.get(`${tableId}`);
            
            if(response.data.status === 'successful' ){
                const {data} = response
                setTableData(data.msg);
            }
            else{
                alert(response.data.Error);
            }
            
        }

        getAllContacts();

    }, [counter]);

    

    const logout = () => {

        onAuthStateChange(false);
        // Clear the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('tableID');

        navigate('/');
    }
    
        
    return (
        
        <>

       
        <div className="overflow-x-auto">

        <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full lg:w-5/6">


                        <button onClick={logout} 
                            className="focus:outline-none text-white bg-red-600 hover:bg-red-500 focus:ring-2 font-medium rounded-lg text-sm px-5 py-2.5 mt-2">
                            Log out
                        </button>

                <div className="bg-white shadow-md rounded my-6">

                    {/* <button className="py-3" > ADD Contact </button> */}
                    <div className="flex justify-between pt-3 pb-1 px-3">
                    <h1 className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl text-blue-600 dark:text-blue-500"> Contacts </h1>

                        <button onClick={() => navigate('/add', {state:{tableId: tableId}} ) } 
                            className="focus:outline-none text-white bg-teal-400 hover:bg-teal-300 focus:ring-2 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                            ADD Contact
                        </button>
                    </div>
             
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">First Name</th>
                                <th className="py-3 px-6 text-left">Last Name</th>
                                <th className="py-3 px-6 text-left">Age</th>
                                <th className="py-3 px-6 text-left">Gender</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-gray-600 text-sm">

                        {
                            tableData.map( (obj) => {
                                return (
                                    
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={obj._id} >

                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="font-medium"> {obj.firstName} </span>
                                            </div>
                                        </td>


                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-left">
                                                <span className="font-medium" > {obj.lastName} </span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center">
                                                <span className="font-medium" > {obj.age} </span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-6 text-left">
                                            <span className="font-medium bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs"> {obj.gender} </span>
                                        </td>

                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-left font-medium text-blue-700">
                                                <span> {obj.email} </span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-6 text-left">
                                            
                                            <div className="inline-flex">
                                                <button onClick={() => navigate('/edit', {state:{userId: obj._id, tableId: tableId}} )} className="bg-gray-300 hover:bg-gray-400 text-gray-600 font-semibold py-2 px-4 rounded-l">
                                                    <svg className="h-5 w-5 text-green-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                    </svg>
                                                </button>
                                                <button onClick={() => deleteContact(obj._id) } className="bg-gray-300 hover:bg-gray-400 text-gray-600 font-semibold py-2 px-4 rounded-r ml-2">
                                                    <svg className="h-5 w-5 text-red-400"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                </button>
                                            </div>


                                        </td>

                                    </tr>

                                )
                            })
                        }
                            

                        </tbody> 
                    </table>
                </div>
            </div>
        </div>
        </div>

        </>



       
    )

}


export default Contacts;


