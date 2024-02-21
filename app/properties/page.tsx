import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClients";

const PropertiesPage =async () => {
    const currentUser=await getCurrentUser();
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized User" subtitle="Please Log In"/>
            </ClientOnly>
        )
    }
    const listings=await getListings({userId:currentUser?.id});

    if(listings.length===0){
        return (
            <ClientOnly>
                <EmptyState title="No Listed Properties" subtitle="Add your Listings"/>
            </ClientOnly>
        )
    }
    return ( 
        <ClientOnly>
            <PropertiesClient currentUser={currentUser} listings={listings}/>
        </ClientOnly>
     );
}
 
export default PropertiesPage;