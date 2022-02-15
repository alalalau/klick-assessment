import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styles } from './TableStyle';

export const Table = (props) => {
    const [tableData, setTableData] = useState(props.users);
    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'dob', headerName: 'Date of Birth', width: 110 },
        { field: 'age', headerName: 'Age', width: 70 },
        { field: 'created', headerName: 'Created At', width: 220 },
        { field: 'updated', headerName: 'Updated At', width: 220 }
    ]

    useEffect(() => {
        setTableData(props.users);
    }, [props.users]);

    return (
        <div style={styles.table}>
            <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={12}
            />
        </div>
    )
}
