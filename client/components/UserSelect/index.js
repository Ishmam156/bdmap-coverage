import React from 'react'
import Select from 'react-select'

// Provide selection of users when uploading district visit
const UserSelect = ({ userDefault, options }) => {
    return (
        <>
            <Select
                isMulti
                defaultValue={userDefault}
                name="employees"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: '#bce7fd',
                        primary: '#19aaf8',
                    },
                })}
            />
        </>
    )
}

export default UserSelect
