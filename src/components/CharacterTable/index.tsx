import { Table, Input, Alert } from 'antd';
import { useCharacters } from '../../hooks/useCharacters';
import { useState } from 'react';

export function CharacterTable() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const { data, isLoading, error } = useCharacters({ page, search });

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Height',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: 'Mass',
            dataIndex: 'mass',
            key: 'mass',
        },
        {
            title: 'Birth Year',
            dataIndex: 'birth_year',
            key: 'birth_year',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
    ];

    return (
        <div>
            <Input.Search
                placeholder="Search characters by name..."
                allowClear
                enterButton
                onSearch={handleSearch}
                style={{ marginBottom: 16, maxWidth: 400 }}
            />
            {error && (
                <Alert
                    message="Error loading characters"
                    description={error.message || 'Failed to fetch data from SWAPI. Please try again later.'}
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
                pagination={{
                    current: page,
                    total: data?.count || 0,
                    pageSize: 10,
                    onChange: setPage,
                }}
            />
        </div>
    );
}
