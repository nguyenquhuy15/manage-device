import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import useSidebar from "../../hooks/useSidebar";
import SidebarFooter from "./SidebarFooter";
import SidebarNav from "./SidebarNav";
import logo from "../../assets/img/avatars/uet.jpg";

const Sidebar = ({ items, showFooter = true }) => {
  const { isOpen } = useSidebar();

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="/"
          >
            <img
              src={logo}
              alt="Logo UET"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
              }}
              className="img-fluid"
            />
          </a>

          <SidebarNav items={items} />
          {!!showFooter && <SidebarFooter />}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

export default Sidebar;
