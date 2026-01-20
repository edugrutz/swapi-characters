import { Table, Input, Alert } from "antd";
import {
  ManOutlined,
  WomanOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { useCharacters } from "../../hooks/useCharacters";
import { useState } from "react";

export function CharacterTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useCharacters({ page, search });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
      width: 100,
    },
    {
      title: "Mass",
      dataIndex: "mass",
      key: "mass",
      width: 100,
    },
    {
      title: "Birth Year",
      dataIndex: "birth_year",
      key: "birth_year",
      width: 150,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 180,
      render: (gender: string) => {
        const getGenderIcon = () => {
          switch (gender.toLowerCase()) {
            case "male":
              return (
                <ManOutlined style={{ color: "#1890ff", marginRight: 8 }} />
              );
            case "female":
              return (
                <WomanOutlined style={{ color: "#eb2f96", marginRight: 8 }} />
              );
            default:
              return (
                <QuestionOutlined
                  style={{ color: "#8c8c8c", marginRight: 8 }}
                />
              );
          }
        };

        return (
          <span
            style={{
              textTransform: "capitalize",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {getGenderIcon()}
            {gender}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Input.Search
          placeholder="Search characters by name..."
          allowClear
          enterButton
          onSearch={handleSearch}
          style={{ maxWidth: 400 }}
        />
      </div>
      {error && (
        <Alert
          message="Error loading characters"
          description={
            error.message ||
            "Failed to fetch data from SWAPI. Please try again later."
          }
          type="error"
          showIcon
          closable
          style={{ marginBottom: 16 }}
        />
      )}
      <Table
        columns={columns}
        dataSource={data?.results || []}
        loading={isLoading}
        rowKey="name"
        tableLayout="fixed"
        scroll={{ x: 730 }}
        pagination={{
          current: page,
          total: data?.count || 0,
          pageSize: 10,
          showSizeChanger: false,
          onChange: setPage,
        }}
      />
    </div>
  );
}
