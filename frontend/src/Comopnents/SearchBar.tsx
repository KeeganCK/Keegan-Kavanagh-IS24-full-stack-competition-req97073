import React, { useState } from "react";
import { Button, Input } from "antd";
import styled from "styled-components";
import { RadioChangeEvent, Typography } from "antd";
import { Radio } from "antd";
import { Project } from "./TablePage";

const { Title } = Typography;
const { Search } = Input;

const CustomSearch = styled(Search)`
  margin: 0 40px 10px 40px;
  width: 400px;
`;

const SearchTypeContainerDiv = styled.div`
  display: flex;
`;

const CustomTitle = styled(Title)`
  margin: 0 5px 0 0;
`;

const options = [
  { label: "Scrum Master", value: "scrumMaster" },
  { label: "Developer", value: "developer" },
];

const SearchBar = (props: {
  setTableData: React.Dispatch<React.SetStateAction<Project[] | undefined>>;
  showNotificationError: (message: string) => void;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchKey: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
  refresh: boolean;
  setRefresh:  React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    props.setSearchKey(value);
  };

  const getFilteredProducts = async (value: string) => {
    setLoading(true);
    props.setSearchValue(value)
    try {
      if(!value) {
        throw new Error("Please Enter a Name");
      }
      const response = await fetch(
        `http://localhost:3000/api/get${props.searchKey}Products/${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      props.setTableData(responseData.data);
      setLoading(false);
    } catch (err: any) {
      props.showNotificationError(err.message);
      setLoading(false);
    }
  };

  const clearSearch = () => {
    props.setSearchValue("");
    props.setRefresh(!props.refresh)
  }

  return (
    <>
      <SearchTypeContainerDiv>
        <CustomTitle level={4}>Search for: </CustomTitle>
        <Radio.Group
          options={options}
          onChange={onChange1}
          value={props.searchKey}
          optionType="button"
        />
      </SearchTypeContainerDiv>
      <CustomSearch
        placeholder="Input Name"
        loading={loading}
        enterButton="Search"
        onSearch={getFilteredProducts}
        value={props.searchValue}
        onChange={(e) => props.setSearchValue(e.currentTarget.value)}
      />
      <Button onClick={clearSearch}>Clear Search</Button>
    </>
  );
};

export default SearchBar;
