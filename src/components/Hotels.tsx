import { getHotelListApi } from '../services';
import { UseQueryResult, useQuery } from 'react-query';
import { StarRating } from './StarRatings';
import { useState } from 'react';
import { CounterInput, Button } from './index';
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

  // Fetch hotel list
  const { data: hotelList, isLoading }: UseQueryResult<Hotel[]> = useQuery({
    queryKey: ['getHotelListApi', 'OBMNG'],
    queryFn: () => getHotelListApi('OBMNG'),
  });

  // Reset filter
  const resetFilter = () => {
    setAdultNumber(0);
    setMinorNumber(0);
    setRating(0);
  };

  return (
    <div className="py-10 lg:px-32 text-gray-800">
      <div className=" border p-5  mx-auto mb-12 rounded-md bg-white">
        <div className="mb-6 font-bold text-lg">Filter</div>
        <div className="grid grid-cols-12 gap-y-5 text-center md:text-left content-end">
          <div className="col-span-12 md:col-span-4">
            <div className="mb-2"> Star Rating</div>
            <StarRating
              color="#ab7900"
              textColor="text-[#ab7900]"
              rating={rating}
              setRating={setRating}
            />
          </div>

          <div className="col-span-5 md:col-span-3">
            <div className="mb-2">Adults</div>
            <CounterInput count={adultNumber} setCount={setAdultNumber} />
          </div>
          <div className="col-span-5 md:col-span-3">
            <div className="mb-2">Children</div>
            <CounterInput count={minorNumber} setCount={setMinorNumber} />
          </div>
          <div className="col-span-2 md:col-span-2 text-white">
            <Button
              onClick={resetFilter}
              label="Reset"
              className="bg-[#009fe3] px-5 py-2 rounded-lg"
            />
          </div>
        </div>
      </div>

    {  isLoading ?  
   <div className="loader mx-auto mt-44"></div>
   : <div className="space-y-10 ">
        {
          hotelList?.map(
            (hotel: Hotel) =>
              parseInt(hotel?.starRating) >= rating && (
                <HotelComponent
                  hotel={hotel}
                  minorNumber={minorNumber}
                  adultNumber={adultNumber}
                  key={hotel?.id}
                />
              ),
          )}
      </div>}
    </div>
  );
};

export default Hotels;
