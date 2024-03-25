import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayOut from "../../components/layouts/AdminLayOut";
import Table from "../../components/shared/Table";
import { AdmindashBoardData } from "../../constants/SampleData";
import { TransformImage, fileFormat } from "../../lib/feather";
import moment from "moment";
import ReanderAttach from "../../components/shared/ReanderAttach";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0
        ? attachments.map((i) => {
            const url = i.url;
            const file = fileFormat(url);
            return (
              <Box>
                <a
                  href={url}
                  download
                  target="_blank"
                  style={{
                    color: "black",
                  }}
                >
                  {ReanderAttach(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"}>
        <Avatar src={params.row.sender.avatar} alt="...." />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageManagment = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      AdmindashBoardData.messages.map((message) => ({
        ...message,
        id: message._id,
        sender: {
          name: message.sender.name,
          avatar: TransformImage(message.sender.avatar, 50),
          createdAt: moment(message.createdAt).format("MMMM Do YYYY,h:mm:ss a"),
        },
      }))
    );
  }, []);
  return (
    <AdminLayOut>
      <Table
        heading={"All Messages"}
        columns={columns}
        rows={rows}
        rowHeight={200}
      />
    </AdminLayOut>
  );
};

export default MessageManagment;
