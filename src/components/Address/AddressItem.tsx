import React from "react";
import { Address } from "../../types/address";
import { Form } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./AddressItem.css"
const AddressItem = ({
  className,
  ...item
}: { className?: string } & Address) => {
  return (
    <div className="border p-3 rounded-3">
      <div className=" d-flex justify-content-between mb-3">
        <b>Họ và tên: {item.name}</b> <div className=" text-danger">Xoá</div>
      </div>
      <div className="address-section">
        <div >
          <CiLocationOn size={20} /> Địa chỉ
        </div>
        <p className="">
          {item.shipping_address}, {item.state}, {item.city}, {item.country}
        </p>
      </div>
      <div className="address-section">
        <div className="d-flex align-items-center">
          <AiOutlinePhone size={20} /> Số điện thoại
        </div>
        <p className=" ">{item.phone}</p>
      </div>
      <div className="address-section">
        <div className="d-flex align-items-center">
          <AiOutlineMail size={20} />
          Địa chỉ email
        </div>

        <p>{item.email}</p>
      </div>
      <div>
        <Link to={`/address/${item.xid}`}>Chỉnh sửa</Link>
      </div>
    </div>
  );
};

export default AddressItem;
