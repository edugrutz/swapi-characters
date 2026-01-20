import { Table } from 'antd';
import { useCharacters } from '../../hooks/useCharacters';
import { useState } from 'react';

export function CharacterTable() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const { data, isLoading } = useCharacters({ page, search });

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
    );
}
