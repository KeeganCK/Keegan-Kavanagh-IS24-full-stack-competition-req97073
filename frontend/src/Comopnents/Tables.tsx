import React, { useEffect, useState } from "react";
import { Button, Modal, Table, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import styled from "styled-components";
import { Typography } from "antd";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import './Table.css';

const { Title } = Typography;

const TableContainerDiv = styled.div`
  width: 80%;
  margin: auto;
`;

const BottomContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export type Project = {
  productId: string;
  productName: string;
  productOwnerName: string;
  Developers: Array<string>;
  scrumMasterName: string;
  startDate: string;
  methodology: string;
};

const Tables = () => {
  const [tableData, setTableData] = useState<Array<Project> | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [record, setRecord] = useState<Project>();
  const [refresh, setRefresh] = useState<boolean>();
	const [cssClass, setCssClass] = useState<string>("")

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/getProjects");
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
      width: 150,
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      width: 125,
    },
    {
      title: "Scrum Master",
      dataIndex: "scrumMasterName",
      key: "scrumMasterName",
      width: 125,
    },
    {
      title: "Product Owner",
      dataIndex: "productOwnerName",
      key: "productOwnerName",
      width: 125,
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
    },
    {
      title: "Start Date (YYYY/MM/DD)",
      dataIndex: "startDate",
      key: "startDate",
      width: 125,
    },
    {
      title: "Methodology",
      dataIndex: "methodology",
      key: "methodology",
      width: 125,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      width: 75,
      render: (i, record) => (
        <Button onClick={() => showEditModal(record)}>Edit</Button>
      ),
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

	const changeCSS = async () => {
		setCssClass('table-row-bordered')
		await new Promise(res => setTimeout(res, 2500));
		setCssClass('table-row-unbordered')
	}

  return (
    <TableContainerDiv>
      {contextHolder}
      <Table
				rowClassName={r => r.productId === record?.productId ? cssClass : ""}
        loading={loading}
        size={"small"}
        columns={columns}
        dataSource={tableData}
				bordered
      />
      <BottomContainerDiv>
        {tableData && (
          <Title type="success" underline level={4} >
            Total Products: {tableData.length}
          </Title>
        )}
        <Button size="large" type="primary" onClick={showModal}>
          Add a new product
        </Button>
      </BottomContainerDiv>
      <Modal
        destroyOnClose
        title="Add a New Product"
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
        />
      </Modal>
      <Modal
        destroyOnClose
        title="Edit Entry"
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

export default Tables;
