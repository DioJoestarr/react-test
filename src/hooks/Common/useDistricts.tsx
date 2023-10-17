import axios from "axios";
import { useQuery } from "react-query";
import { District, Province } from "../../types/common";

const useDistricts = (province_code) => {
  const data = useQuery({
    queryKey: ["districts", province_code],
    queryFn: async () => {
      if (!province_code) return undefined;
      const { data } = await axios.get<Province>(
        `https://provinces.open-api.vn/api/p/${province_code}?depth=2`,
        {
          params: {
            province_code: province_code,
          },
        }
      );
      return data;
    },
  });
  return data;
};

export default useDistricts;
