import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import useSidebar from "../../hooks/useSidebar";
import SidebarFooter from "./SidebarFooter";
import SidebarNav from "./SidebarNav";
import logo from "../../assets/img/avatars/uet.jpg";

const Sidebar = ({ items, showFooter = true }) => {
  const { isOpen } = useSidebar();

  return (
    <nav
      className={`sidebar ${!isOpen ? "collapsed" : ""}`}
      style={{
        backgroundColor: "#004080", // Thay đổi màu nền tại đây
        width: isOpen ? "300px" : "80px", // Tăng độ rộng của sidebar
        transition: "width 0.2s", // Thêm chuyển động mượt mà khi thay đổi kích thước
      }}
    >
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="/"
            style={{ color: "#fff", textDecoration: "none" }} // Đổi màu chữ cho phù hợp với màu nền
          >
            <img
              src={logo}
              alt="Logo UET"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
              }}
              className="img-fluid"
            />
            {isOpen && <span className="align-middle ms-2">UET</span>}
          </a>

          <SidebarNav items={items} />
          {!!showFooter && <SidebarFooter />}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

export default Sidebar;
