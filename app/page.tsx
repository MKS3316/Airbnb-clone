import Image from 'next/image'
import ClientOnly from './components/ClientOnly';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import getCurrentUser from './actions/getCurrentUser';
import getListings, { IListingsParams } from './actions/getListings';
import ListingCard from './components/listings/ListingCard';

interface IHomeParams{
  searchParams:IListingsParams;
}

const Home=async({searchParams}:IHomeParams)=>{

  const currentUser=await getCurrentUser();
  const listings=await getListings(searchParams);

  const isEmpty=true;
  if(listings.length===0){
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
    
    <ClientOnly>
      <Container>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pt-28 gap-8'>
          {listings.map((listing)=>{
            return (
              <ListingCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
    
  )
}

export default Home;