import React from 'react';


interface CustomTableProps {
    dataSource: object[]|null;
    columns: object[];
}

const CustomTable:React.FC<CustomTableProps> = ({dataSource, columns}) => {

    return (
        <table className='table'>
            <thead>
            <tr>
                {columns.map((column) => (
                    <th scope="col" key={column.key}>{column.title}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {dataSource?.map((data, index) => (
                <tr key={index}>
                    {columns?.map((column) => (
                        <td>
                            {
                                column.render ? column.render(data[column.dataIndex],data) :
                                    data[column.dataIndex]
                            }
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CustomTable;