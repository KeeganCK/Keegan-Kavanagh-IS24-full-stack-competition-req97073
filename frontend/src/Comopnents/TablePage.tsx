import React, { useEffect, useState } from "react";
import { Button, Modal, Table, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import styled from "styled-components";
import { Typography } from "antd";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import "./Table.css";
import SearchBar from "./SearchBar";

const { Text } = Typography;

const TableContainerDiv = styled.div`
  width: 80%;
  margin: auto;
`;

const SearchContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const BottomContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalItemsP = styled.p``;

export type Project = {
  productId: string;
  productName: string;
  productOwnerName: string;
  Developers: Array<string>;
  scrumMasterName: string;
  startDate: string;
  methodology: string;
};

const TablePage = () => {
  const [tableData, setTableData] = useState<Array<Project> | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [record, setRecord] = useState<Project>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [cssClass, setCssClass] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchKey, setSearchKey] = useState<string>("scrumMaster");

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        let response: any;
        if (searchValue) {
          response = await fetch(
            `http://localhost:3000/api/get${searchKey}Products/${searchValue}`
          );
        } else {
          response = await fetch("http://localhost:3000/api/getProducts");
        }
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setTableData(responseData.data);
        setLoading(false);
      } catch (err: any) {
        api.error({
          message: err.message,
          placement: "top",
        });
        setLoading(false);
      }
    };
    getProjects();
  }, [refresh]);

  const columns: ColumnsType<Project> = [
    {
      title: "Product Number",
      dataIndex: "productId",
      key: "productId",
      width: 120,
      ellipsis: {
        showTitle: true,
      },
      align: "center",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      width: 110,
      align: "center",
    },
    {
      title: "Scrum Master",
      dataIndex: "scrumMasterName",
      key: "scrumMasterName",
      width: 105,
      align: "center",
    },
    {
      title: "Product Owner",
      dataIndex: "productOwnerName",
      key: "productOwnerName",
      width: 125,
      align: "center",
    },
    {
      title: "Developers",
      dataIndex: "Developers",
      key: "Developers",
      render: (i, { Developers }) => (
        <>
          {Developers.map((developer, j) => {
            return (
              <p key={j} style={{ margin: "0.5px 0" }}>
                {developer}
              </p>
            );
          })}
        </>
      ),
      width: 125,
      align: "center",
    },
    {
      title: "Start Date (YYYY/MM/DD)",
      dataIndex: "startDate",
      key: "startDate",
      width: 105,
      align: "center",
    },
    {
      title: "Methodology",
      dataIndex: "methodology",
      key: "methodology",
      width: 100,
      align: "center",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      width: 75,
      render: (i, record) => (
        <Button onClick={() => showEditModal(record)}>Edit</Button>
      ),
      align: "center",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = (record: Project) => {
    setRecord(record);
    setIsEditModalOpen(true);
  };

  const handleCancel = () => {
    setRefresh(!refresh);
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const showNotification = (message: string) => {
    api.success({
      message: message,
      placement: "top",
    });
  };

  const showNotificationError = (message: string) => {
    api.error({
      message: message,
      placement: "top",
    });
  };

  const changeCSS = async () => {
    setCssClass("table-row-bordered");
    await new Promise((res) => setTimeout(res, 2500));
    setCssClass("table-row-unbordered");
  };

  const removeSearch = () => {
    setSearchValue("");
  };

  return (
    <TableContainerDiv>
      {contextHolder}
      <SearchContainerDiv>
        <SearchBar
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showNotificationError={showNotificationError}
          setTableData={setTableData}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </SearchContainerDiv>
      <Table
        pagination={{ pageSize: 8 }}
        rowClassName={(r, index) =>
          r.productId === record?.productId
            ? index % 2 === 0
              ? `table-row-light ${cssClass}`
              : `table-row-dark ${cssClass}`
            : index % 2 === 0
            ? `table-row-light`
            : `table-row-dark`
        }
        loading={loading}
        size={"small"}
        columns={columns}
        dataSource={tableData}
        bordered
        footer={() => {
          return (
            <BottomContainerDiv>
              {tableData && (
                <Text strong>Total Products: {tableData.length}</Text>
              )}
              <Button type="primary" onClick={showModal}>
                Add Product
              </Button>
            </BottomContainerDiv>
          );
        }}
      />
      <Modal
        destroyOnClose
        title="Add Product"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        closable
      >
        <AddProductForm
          closeModal={handleCancel}
          showNotification={showNotification}
          setRecord={setRecord}
          changeCSS={changeCSS}
          removeSearch={removeSearch}
        />
      </Modal>
      <Modal
        destroyOnClose
        title="Edit Product"
        open={isEditModalOpen}
        footer={null}
        onCancel={handleCancel}
        closable
      >
        {record && (
          <EditProductForm
            record={record}
            closeModal={handleCancel}
            showNotification={showNotification}
            changeCSS={changeCSS}
          />
        )}
      </Modal>
    </TableContainerDiv>
  );
};

export default TablePage;
