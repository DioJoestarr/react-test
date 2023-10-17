/* eslint-disable no-unused-vars */
import { useAddressSetState, useAddressState } from "../store/AddressStore";
import AddressItem from "../components/Address/AddressItem";
// eslint-disable-next-line no-unused-vars
import { MdKeyboardArrowUp } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import instance from "../utils/instance";
import useAdressList from "../hooks/Address/useAdressList";
import { withAuth } from "../hocs/withAuth";
//react query em thấy hiệu năng, tốc độ khá tốt, hỗ trợ scroll đến item cũ sau khi back lại.
function Address() {
  //dùng react query để scroll load more các page trong api
  const { data, hasNextPage, isLoading, fetchNextPage } = useAdressList();
  const setAddress = useAddressSetState();

  useEffect(() => {
    // thật sự là không cần dùng global state khi dùng react query vì no đã cache săn nên ko request nhiều lần,
    // nhưng vì api không có endpoint lấy detail nên phải lưu vào global state để trang edit lấy ra
    data && setAddress(data);
  }, [data]);

  return (
    <div className=" container py-3 max-w-400 ">
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

      {!isLoading ? (
        <InfiniteScroll
          dataLength={data?.length || 0}
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
          {data?.map((item) => {
            return <AddressItem key={item.xid} {...item} />;
          })}
        </InfiniteScroll>
      ) : (
        <h4 className="text-center">Đang tải...</h4>
      )}
      <div
        onClick={() => window.scrollTo(0, 0)}
        className="position-fixed   rounded-circle p-1   "
        style={{
          bottom: "5%",
          right: 20,
          width: "fit-content",
          cursor: "pointer",
          backgroundColor:"rgb(255, 221, 15)"
        }}
      >
        <MdKeyboardArrowUp size={30} color="white" />
      </div>
    </div>
  );
}

export default withAuth(Address);
