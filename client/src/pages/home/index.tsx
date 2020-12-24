import React from "react";
import Table from "./components/Table"

const HomeLayout: React.FC<any> = () => {
  return (
    <div className="site-layout-content" style={{ padding: "30px" }}>
      <Table  /> 
    </div>
  );
};

export default HomeLayout;
