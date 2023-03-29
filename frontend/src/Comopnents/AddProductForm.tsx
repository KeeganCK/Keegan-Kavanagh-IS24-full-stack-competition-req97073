import React from "react";
import { Button, Form, Input, Select } from "antd";

const AddProductForm = () => {
  const onFinish = async (values: any) => {
    const developers = [];
    for (let i = 1; i < 6; i++) {
      if (values["developer" + i.toString()]) {
        developers.push(values["developer" + i.toString()]);
      }
    }
    console.log(values);
    try {
      const response = await fetch(`http://localhost:3000/api/addProject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: values.productName,
          productOwnerName: values.productOwnerName,
          Developers: developers,
          scrumMasterName: values.scrumMasterName,
          startDate: values.startDate,
          methodology: values.methodology,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
			console.log(err.message)
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
      <Form.Item
        labelCol={{ span: 6 }}
        label="Product Name"
        name="productName"
        rules={[{ required: true, message: "Please input a Product Name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6 }}
        label="Scrum Master"
        name="scrumMasterName"
        rules={[{ required: true, message: "Please input a Scrum Master!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6 }}
        label="Product Owner"
        name="productOwnerName"
        rules={[{ required: true, message: "Please input a Product Owner!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6 }}
        label="Developer"
        name="developer1"
        rules={[{ required: true, message: "Please input a Developer" }]}
      >
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
      <Form.Item
        labelCol={{ span: 6 }}
        label="Start Date"
        name="startDate"
        rules={[{ required: true, message: "Please enter a Start Date" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6 }}
        label="Methodology"
        name="methodology"
        rules={[{ required: true, message: "Please choose a methodology" }]}
      >
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
          Add Product (save)
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductForm;
