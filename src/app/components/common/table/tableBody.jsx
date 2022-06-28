import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
    const renderComponent = (component, data) => {
        if (typeof component === "function") return component(data);
        return component;
    };

    const renderContent = (column, item) => {
        if (columns[column].component) {
            return renderComponent(columns[column].component, item);
        }
        return _.get(item, columns[column].path);
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((col) => (
                        <td key={col}>{renderContent(col, item)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired,
};

export default TableBody;
