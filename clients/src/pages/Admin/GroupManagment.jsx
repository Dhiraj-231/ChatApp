import { Avatar, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayOut from "../../components/layouts/AdminLayOut";
import AvatarCard from "../../components/shared/AvatarCard";
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
    renderCell: (params) => (
      <AvatarCard avatar={params.row.avatar} alt="Avatar" />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AvatarCard max={100} avatar={params.row.members} />
      </Stack>
    ),
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar src={params.row.creator.avatar} alt="PataNahi" />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];
const GroupManagment = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      AdmindashBoardData.chats.map((chat) => ({
        ...chat,
        id: chat._id,
        avatar: chat.avatar.map((i) => TransformImage(i, 50)),
        members: chat.members.map((i) => TransformImage(i.avatar, 50)),
        creator: {
          name: chat.creator.name,
          avatar: TransformImage(chat.creator.avatar, 50),
        },
      }))
    );
  }, []);
  return (
    <AdminLayOut>
      <Table heading={"All Chats"} columns={columns} rows={rows} />
    </AdminLayOut>
  );
};

export default GroupManagment;
