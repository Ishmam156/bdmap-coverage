import React from 'react'
import Input from '@material-ui/core/Input'

// Hande image upload and check if file is an image
const ImageUpload = ({ setSelectedFile }) => {
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0])
    }

    return (
        <>
            <Input
                fullWidth
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={handleFileInput}
            />
        </>
    )
}

export default ImageUpload
