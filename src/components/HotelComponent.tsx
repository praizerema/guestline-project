import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';
import { StarRatingFixed } from './StarRatings';
import { UseQueryResult, useQuery } from 'react-query';
import { getHotelRoomAndRatesApi } from '../services';

interface ComponentProps {
  rating: number;
   minorNumber: number;
   hotel: any;
   adultNumber: number

}

interface Image {
  url: string;
}

interface HotelRoomDetails{
  ratePlans: {}[];
  rooms: {
bedConfiguration:string;
disabledAccess:boolean;
facilities:[];
id:string;
images:string;
longDescription:string;
name:string;
occupancy: {maxAdults: number, maxChildren: number};
  }[]
}


export const HotelComponent: React.FC<ComponentProps> = ({ hotel, rating, minorNumber, adultNumber }) => {
  
const [images, setImages] = useState<string[]>([])
useEffect(()=>{
  let urls:string[] = []
  hotel?.images?.map((img:Image) => urls.push(img.url))
setImages(urls)
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

const { data: hotelRoomAndRating, isLoading }:UseQueryResult<HotelRoomDetails> = useQuery({
  queryKey: ['getHotelRoomAndRatesApi', hotel?.id],
  queryFn: () => getHotelRoomAndRatesApi(hotel.id),
});
console.log({hotelRoomAndRating});

  return (
    <div>
  <div className="flex justify-between ">
    <div className="flex items-center">
      <div>

        <Carousel images={images}/>
      </div>
      <div>
       <div>{hotel?.name}</div>
       <div>{hotel?.address1}, {hotel?.town}, {hotel?.country}</div>
     {hotel?.address2  && <div>{hotel?.address2}, {hotel?.town}, {hotel?.country}</div>}


      </div>
    </div>

    <div>
      <StarRatingFixed
          color="#009fe3"
          textColor="text-[#009fe3]"
          rating={hotel.starRating}
          setRating={()=><></>}
        />
    </div>
  </div>
  <div className='space-y-10'>
    {
     !isLoading && hotelRoomAndRating?.rooms.map(room =>(
      (room.occupancy.maxAdults >= adultNumber && room.occupancy.maxChildren >= minorNumber)   && <div key={room.id}>
        <div className="grid grid-cols-6">
<div className="col-span-1">
<div>{room.name}</div>
<div><span>Adults:</span> <span>{room.occupancy.maxAdults}</span></div>
<div><span>Children:</span> <span>{room.occupancy.maxChildren}</span></div>

</div>
<div className="col-span-5">{room.longDescription}</div>

        </div>
 

      </div>
     ))
    }
  </div>
    </div>
  );
};

