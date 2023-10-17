/* eslint-disable no-unused-vars */
import { useAddressState } from "../store/AddressStore";
import AddressItem from "../components/Address/AddressItem";
// eslint-disable-next-line no-unused-vars
import InfiniteScroll from "react-infinite-scroll-component";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import instance from "../utils/instance";

function Address() {

  const [address, setAddress] = useAddressState();
  const fetchMore = async (shouldFetch) => {
    const { data, isLoading, nextPage,firstFetch } = address;
    // if(firstFetch && shouldFetch){

    // }
    const res = await instance.get(nextPage);
    const newUrl = res.data.meta.paging.links.next?.replace(
      instance.defaults.baseURL,
      ""
    );
    setAddress({
      nextPage: newUrl,
      data: [...data, ...res.data?.data||[]],
      isLoading: false,
      firstFetch: false
    });
  };
  console.log(address)
  useEffect(() => {
    fetchMore();
  }, []);
  return (
    <div className=" container py-3">
      <h3 className="text-center fw-bold">Danh sách địa chỉ </h3>
      <hr className=" border-warning border-2" />
      <div>
        <Link
          to={"/add-address"}
          className="border p-3 position-relative d-block mb-3"
          style={{ aspectRatio: 1 }}
        >
          <div
            className=" w-100 h-100"
            style={{
              borderStyle: "dashed",
              border: "var(--bs-border-width) dashed var(--bs-border-color)",
            }}
          >
            <div
              className=" d-flex align-items-center flex-column justify-content-center w-100"
              style={{
                position: "absolute",
                top: "30%",
                left: 0,
              }}
            >
              <div
                className=" rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: "60px",
                  aspectRatio: 1,
                  border:
                    "var(--bs-border-width) dashed var(--bs-border-color)",
                }}
              >
                <AiOutlinePlus size={30} />
              </div>
              <div className="mt-3">
                <button className=" btn btn-light">Thêm mới</button>
              </div>
            </div>
          </div>
        </Link>
      </div>
      {address.data?.map((item) => {
        return <AddressItem key={item.xid} {...item} />;
      })}
      {/* {!isLoading ? (
        <InfiniteScroll
          dataLength={dataList?.length || 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          className="d-flex flex-column gap-3"
          loader={<h4 className="text-center">Đang tải...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Bạn đã xem hết kết quả</b>
            </p>
          }
        >
          {dataList?.map((item) => {
            return <AddressItem key={item.xid} {...item} />;
          })}
        </InfiniteScroll>
      ) : (
        <h4 className="text-center">Đang tải...</h4>
      )} */}
    </div>
  );
}

export default Address;
