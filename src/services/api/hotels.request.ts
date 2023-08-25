import { apiService } from "../index";

/** Get All Hotels list. The React-Query key is "getHotelListApi" */
export const getHotelListApi = async (id:string) => {
	const res = await apiService.get(`/hotels?collection-id=${id}`);
	return res;
};

export const getHotelRoomAndRatesApi = async (id: string) => {
	const res = await apiService.get(`/roomRates/OBMNG/${id}`);
	return res;
};