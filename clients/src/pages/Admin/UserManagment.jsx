import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayOut from "../../components/layouts/AdminLayOut";
import Table from "../../components/shared/Table";
import { AdmindashBoardData } from "../../constants/SampleData";
import { TransformImage } from "../../lib/feather";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <Avatar src={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "group",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 150,
  },
];

const UserManagment = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      AdmindashBoardData.users.map((user) => ({
        ...user,
        id: user._id,
        avatar: TransformImage(user.avatar, 50),
      }))
    );
  }, []);
  return (
    <AdminLayOut>
      <Table heading={"All Users"} columns={columns} rows={rows} />
    </AdminLayOut>
  );
};

export default UserManagment;
