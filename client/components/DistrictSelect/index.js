import React from 'react'
import Select from 'react-select'

// Return a district selector and check whether default has been provided or not
const DistrictSelect = ({ districtOptions, defaultVal }) => {
    const defaultValue = defaultVal ? defaultVal : ''

    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={defaultValue}
                isDisabled={false}
                isLoading={false}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                name="district"
                options={districtOptions}
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

export default DistrictSelect
