// Provide selection options to District Select and User Select fields
const districtNumbers = (name, districts, users, user, distDefault) => {
    // Remove the districts that are mapped as islands
    const filteredDistrict = districts.filter(
        (district) => !district.name.includes('island')
    )

    // Convert actual district to district options
    const districtOptions = filteredDistrict.map((district) => {
        return { value: district.dbID, label: district.name }
    })

    // Check if default District has been provided
    let defaultValue = ''
    if (distDefault) {
        defaultValue = districtOptions.find(
            (district) => district.label === name
        )
    }

    // Convert users to user options
    const userOptions = users.map((user) => {
        return { value: user.id, label: user.name }
    })

    // Find the current logged in user
    const userDefault = userOptions.find((users) => users.label === user.name)

    return [districtOptions, defaultValue, userOptions, userDefault]
}

export default districtNumbers
