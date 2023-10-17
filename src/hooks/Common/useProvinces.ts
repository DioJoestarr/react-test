import axios from "axios";
import { useQuery } from "react-query";
import { Province } from "../../types/common";

const useProvinces = () => {
  const data = useQuery({
    queryKey: ["provinces"],
    queryFn: async () => {
      const { data } = await axios.get<Province[]>(
        "https://provinces.open-api.vn/api/?depth=1"
      );
      return data;
    },
  });
  return data;
};

export default useProvinces;
