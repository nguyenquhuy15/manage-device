import React from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import useSidebar from "../../hooks/useSidebar";
import SidebarFooter from "./SidebarFooter";
import SidebarNav from "./SidebarNav";
import logo from "../../assets/img/avatars/uet";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";

const Sidebar = ({ items, showFooter = true }) => {
  const { isOpen } = useSidebar();

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "80%", // Tăng hoặc giảm kích thước tùy ý
                maxWidth: "500px",
                height: "auto",
                objectFit: "contain",
                backgroundColor: "transparent", // Đảm bảo nền trong suốt
                boxShadow: "none", // Không sử dụng shadow để tránh hiệu ứng khác màu
              }}
              className="img-fluid"
            />{" "}
            <span className="align-middle me-3">UET</span>
          </a>

          <SidebarNav items={items} />
          {!!showFooter && <SidebarFooter />}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

export default Sidebar;
