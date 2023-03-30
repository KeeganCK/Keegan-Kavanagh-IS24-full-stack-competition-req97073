import React, { useEffect } from "react";
import { Button, Form, Input, Select, notification } from "antd";
import { Project } from "./TablePage";

const EditProductForm = (props: {
  record: Project;
  closeModal: () => void;
  showNotification: (message: string) => void;
  changeCSS: () => void;
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    let count = 0;
    for (const value in values) {
      if (values[value]) {
        count = count + 1;
      }
    }
    if (count === 0) {
      api.error({
        message: "need at least one value filled out",
        placement: "top",
      });
      throw new Error("need at least one value filled out");
    }
    const developers = [];
    for (let i = 1; i < 6; i++) {
      if (values["developer" + i.toString()]) {
        developers.push(values["developer" + i.toString()]);
      }
    }

    try {
      if (!props.record) {
        throw new Error("No record found");
      }
      const response = await fetch(`http://localhost:3000/api/editProduct`, {
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
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      form.resetFields();
      props.closeModal();
      props.showNotification(responseData.message);
      props.changeCSS();
    } catch (err: any) {
      api.error({
        message: err.message,
        placement: "top",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item
        initialValue={props.record.productName}
        labelCol={{ span: 6 }}
        label="Product Name"
        name="productName"
      >
        <Input />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 6 }}
        label="Scrum Master"
        name="scrumMasterName"
        initialValue={props.record.scrumMasterName}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={props.record.productOwnerName}
        labelCol={{ span: 6 }}
        label="Product Owner"
        name="productOwnerName"
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={props.record.Developers[0]}
        labelCol={{ span: 6 }}
        label="Developer #1"
        name="developer1"
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={props.record.Developers[1]}
        labelCol={{ span: 6 }}
        label="Developer #2"
        name="developer2"
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={props.record.Developers[2]}
        labelCol={{ span: 6 }}
        label="Developer #3"
        name="developer3"
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={props.record.Developers[3]}
        labelCol={{ span: 6 }}
        label="Developer #4"
        name="developer4"
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={props.record.Developers[4]}
        labelCol={{ span: 6 }}
        label="Developer #5"
        name="developer5"
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={props.record.methodology}
        labelCol={{ span: 6 }}
        label="Methodology"
        name="methodology"
      >
        <Select
          style={{ width: 120 }}
          options={[
            { value: "Agile", label: "Agile" },
            { value: "Waterfall", label: "Waterfall" },
          ]}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProductForm;
