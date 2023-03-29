import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { Project } from "./Tables";

const EditProductForm = ( props: { record: Project, closeModal: () => void} ) => {
  const onFinish = async (values: any) => {
    const developers = [];
    for (let i = 1; i < 6; i++) {
      if (values["developer" + i.toString()]) {
        developers.push(values["developer" + i.toString()]);
      }
    }
    console.log(values);
    try {
			if (!props.record) {
        throw new Error("No record found");
      }
      const response = await fetch(`http://localhost:3000/api/editProject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
					productId: props.record.productId,
          productName: values.productName,
          productOwnerName: values.productOwnerName,
          Developers: developers,
          scrumMasterName: values.scrumMasterName,
          methodology: values.methodology,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(responseData.message);
      }
			props.closeModal();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item labelCol={{ span: 6 }} label="Product Name" name="productName">
        <Input />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6 }}
        label="Scrum Master"
        name="scrumMasterName"
      >
        <Input />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6 }}
        label="Product Owner"
        name="productOwnerName"
      >
        <Input />
      </Form.Item>
      <Form.Item labelCol={{ span: 6 }} label="Developer" name="developer1">
        <Input />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6 }}
        label="Second Developer"
        name="developer2"
      >
        <Input />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6 }}
        label="Third Developer"
        name="developer3"
      >
        <Input />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6 }}
        label="Fourth Developer"
        name="developer4"
      >
        <Input />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6 }}
        label="Fifth Developer"
        name="developer5"
      >
        <Input />
      </Form.Item>
      <Form.Item labelCol={{ span: 6 }} label="Methodology" name="methodology">
        <Select
          defaultValue=""
          style={{ width: 120 }}
          options={[
            { value: "Agile", label: "Agile" },
            { value: "Waterfall", label: "Waterfall" },
          ]}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Edit Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProductForm;
