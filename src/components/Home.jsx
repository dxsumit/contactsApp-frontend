import Contacts from "./Contacts";
import LandingPage from "./Landing";

const Home = ({isAuthorized, tableId, onAuthStateChange }) => {

    if(isAuthorized) {
        
        return ( 
            <Contacts tableId={tableId} onAuthStateChange={onAuthStateChange}/> 
        )
    
    }
    else {
        
        return (
            <LandingPage />
        )

    }

}


export default Home;

