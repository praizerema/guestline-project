import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';
import { StarRatingFixed } from './StarRatings';
import { UseQueryResult, useQuery } from 'react-query';
import { getHotelRoomAndRatesApi } from '../services';
import { Link } from 'react-router-dom';
import { RiMailLine, RiPhoneLine } from 'react-icons/ri';

interface ComponentProps {
  minorNumber: number;
  hotel: any;
  adultNumber: number;
}

interface Image {
  url: string;
}

interface HotelRoomDetails {
  ratePlans: {}[];
  rooms: {
    bedConfiguration: string;
    disabledAccess: boolean;
    facilities: [];
    id: string;
    images: string;
    longDescription: string;
    name: string;
    occupancy: { maxAdults: number; maxChildren: number };
  }[];
}

export const HotelComponent: React.FC<ComponentProps> = ({
  hotel,
  minorNumber,
  adultNumber,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<HotelRoomDetails['rooms']>(
    [],
  );

  useEffect(() => {
    let urls: string[] = [];
    hotel?.images?.map((img: Image) => urls.push(img.url));
    setImages(urls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: hotelRoomAndRating,
    isLoading,
  }: UseQueryResult<HotelRoomDetails> = useQuery({
    queryKey: ['getHotelRoomAndRatesApi', hotel?.id],
    queryFn: () => getHotelRoomAndRatesApi(hotel.id),
  });

  useEffect(() => {
    let roomsToShow: any = hotelRoomAndRating?.rooms.filter(
      (room) =>
        room.occupancy.maxAdults >= adultNumber &&
        room.occupancy.maxChildren >= minorNumber,
    );
    setFilteredRooms(roomsToShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelRoomAndRating, adultNumber, minorNumber]);

  return isLoading ? null : (
    <div className="border px-8 py-12 rounded-md bg-white text-gray-800">
      <div className="md:flex justify-between mb-10 border-b-2 pb-10">
        <div className="md:flex items-center">
          <div className="pb-10">
            <h1 className="font-bold text-gray-800 text-3xl text-center mb-3">
              {hotel?.name}
            </h1>
            <Carousel images={images} />
          </div>
          <div>
            <p className="text-lg">
              {hotel?.address1}, {hotel?.town}, {hotel?.country}
            </p>
            {hotel?.address2 && (
              <p className="text-lg my-1">
                {hotel?.address2}, {hotel?.town}, {hotel?.country}
              </p>
            )}
            <div className="flex items-center gap-x-2">
              <RiMailLine />{' '}
              <Link to={`mailto:${hotel.email}`}>{hotel.email}</Link>
            </div>
            <p className="mt-1 flex items-center gap-x-2">
              <RiPhoneLine />
              <span>{hotel.telephone}</span>
            </p>
            <div>
              <StarRatingFixed
                color="#fbc103"
                textColor="text-[#fbc103]"
                rating={hotel.starRating}
                setRating={() => undefined}
              />
            </div>
          </div>
        </div>
      </div>
      {/* ROOMS */}
      <div className="space-y-10">
        {filteredRooms?.length ? (
          filteredRooms.map((room) => (
            <div key={room.id}>
              <div className="grid grid-cols-6 gap-x-10 gap-y-5">
                <div className="col-span-6 md:col-span-2 md:text-left">
                  <h3 className="text-gray-800 font-bold text-2xl">
                    {room.name}
                  </h3>
                  <div>
                    <span>Adults:</span> <span>{room.occupancy.maxAdults}</span>
                  </div>
                  <div>
                    <span>Children:</span>{' '}
                    <span>{room.occupancy.maxChildren}</span>
                  </div>
                </div>
                <p className="col-span-6 md:col-span-4 md:text-left">
                  {room.longDescription}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 font-bold text-xl">
            Sorry, your room choice is currently not available in this hotel
          </p>
        )}
      </div>
    </div>
  );
};
