import getCurrentUser from "../actions/getCurrentUser";
import getFavourites from "../actions/getFavourites";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavouriteClient from "./FavouriteClient";


const FavouriteListingPage =async () => {
    const currentUser=await getCurrentUser();
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized User" subtitle="Please Login"/>
            </ClientOnly>
        )
    }

    const favouriteListing=await getFavourites();

    if(favouriteListing.length===0){
        return (
            <ClientOnly>
                <EmptyState title="No Favourite Listings" subtitle="Like some properties from Listings in the home page"/>
            </ClientOnly>
        )
    }


    return ( 
        <ClientOnly>
            <FavouriteClient currentUser={currentUser} listings={favouriteListing}/>
        </ClientOnly>
     );
}
 
export default FavouriteListingPage;