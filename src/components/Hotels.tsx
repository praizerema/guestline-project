import { getHotelListApi } from '../services';
import { UseQueryResult, useQuery } from 'react-query';
import { StarRating } from './StarRatings';
import { useState } from 'react';
import { CounterInput } from './inputs';
import { HotelComponent } from './HotelComponent';

interface Hotel {
  address1: string;
  address2: string;
  checkInHours: string;
  checkInMinutes: string;
  checkOutHours: string;
  checkOutMinutes: string;
  country: string;
  countryCode: string;
  description: string;
  email: string;
  facilities: { code: string }[];
  id: string;
  images: { url: string }[];
  name: string;
  position: { latitude: number; longitude: number; timezone: string };
  postcode: string;
  starRating: string;
  telephone: string;
  town: string;
}
const Hotels = () => {
  const [rating, setRating] = useState(0);
  const [minorNumber, setMinorNumber] = useState(0);
  const [adultNumber, setAdultNumber] = useState(0);

  const { data: hotelList, isLoading }:UseQueryResult<Hotel[]> = useQuery({
    queryKey: ['getHotelListApi', 'OBMNG'],
    queryFn: () => getHotelListApi('OBMNG'),
  });

  return (
    <div>
      <div className="flex">
        <StarRating
          color="#afbbd1"
          textColor="text-[#afbbd1]"
          rating={rating}
          setRating={setRating}
        />
        <div className="flex">
          <span>Adults</span>
          <CounterInput count={adultNumber} setCount={setAdultNumber} />
        </div>
        <div className="flex">
          <span>Children</span>
          <CounterInput count={minorNumber} setCount={setMinorNumber} />
        </div>
      </div>

      <div className='space-y-10'>
        {!isLoading && hotelList?.map((hotel: Hotel) => (
         parseInt(hotel?.starRating) >= rating && <HotelComponent rating= {rating} hotel= {hotel} minorNumber= {minorNumber} adultNumber={adultNumber} key = {hotel?.id}/>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
