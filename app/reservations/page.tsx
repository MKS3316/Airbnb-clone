import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import ReservationClient from "./ReservationClient";



const Reservation =async () => {
    const currentUser=await getCurrentUser();
    const reservations=await getReservations({authorId:currentUser?.id});

    return ( 
        <ClientOnly>
            <ReservationClient currentUser={currentUser} reservations={reservations}/>
        </ClientOnly>
     );
}
 
export default Reservation;