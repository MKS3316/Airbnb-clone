import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";


const Trips =async () => {

    const currentUser=await getCurrentUser();
    const reservations=await getReservations({userId:currentUser?.id});

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login"/>
            </ClientOnly>
        )
    }

    if(reservations.length===0){
        return (
            <ClientOnly>
                <EmptyState title="No Trips" subtitle="Looks like you haven't done any trip reservation"/>
            </ClientOnly>
        )
    }
    return ( 
        <ClientOnly>
            <TripsClient currentUser={currentUser} reservations={reservations}/>
        </ClientOnly>
     );
}
 
export default Trips;