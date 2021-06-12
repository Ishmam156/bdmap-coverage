import React, { useContext, useState } from 'react'
import { DSMapContext } from '../MapContext'
import { Link } from 'react-router-dom'

import DistrictSelect from 'Components/DistrictSelect'
import ImageUpload from 'Components/ImageUpload'
import Loading from 'Components/Loading'
import UserSelect from 'Components/UserSelect'

import imageService from '../../services/image'
import districtNumbers from 'Utilities/district'
import districtService from '../../services/district'
import useField from '../../hooks/useField'
import visitService from '../../services/visit'

import { Alert, AlertTitle } from '@material-ui/lab'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'

// Takes care of uploading a new visit
// Function has become a bit too long and can be refactored to utilize helper functions/files
const DistrictUpload = ({ name, distDefault }) => {
    const [user, , districts, setDistricts, users, , visit, setVisit, ,] =
        useContext(DSMapContext)

    // States to keep track of upload information
    const [uploadedFile, setUploadedFile] = useState(null)
    const [uploadingStatus, setUploadingStatus] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [description, setDescription] = useField('text', 'description')
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState('error')
    const [districtID, setDistrictID] = useState(null)

    const districtStats = districts.find((district) => district.name === name)

    // Default loading screen
    if (distDefault && !districtStats) {
        return <Loading />
    }

    // Error page if not logged in
    if (!user) {
        return (
            <Grid container alignItems="center" justify="center" spacing={2}>
                <Grid
                    item
                    xs={12}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="subtitle2">
                        You must be logged in to view profile page.
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Link to="/login">
                        <Button variant="contained" color="primary">
                            Log In
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        )
    }

    // Helper function to get select option requirements
    const [districtOptions, defaultValue, userOptions, userDefault] =
        districtNumbers(name, districts, users, user, distDefault)

    if (!userDefault) {
        return <Loading />
    }

    // Form validation
    const handleSubmit = async (event) => {
        event.preventDefault()
        // District unique ID
        const districtID = event.target[1].value

        // Validation checks
        if (!districtID) {
            setMessage('District name must be provided')
            setMessageType('error')
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 2000)

            return null
        }

        if (!selectedFile) {
            setMessage('Visit image must be provided')
            setMessageType('error')
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 2000)

            return null
        }
        if (!description.value) {
            setMessage('Visit description must be provided')
            setMessageType('error')
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 2000)

            return null
        }

        // Getting colleagues unique ID
        let i
        const totalVisitors = []
        for (i = 5; i < event.target.length - 1; i++) {
            totalVisitors.push(event.target[i].value)
        }

        // Colleague validation and check if user is included or not
        if (totalVisitors[0] === '') {
            setMessage('Atleast a single colleague must be mentioned')
            setMessageType('error')
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 2000)

            return null
        }

        if (!totalVisitors.includes(user.id)) {
            setMessage('You must be a member of the visit')
            setMessageType('error')
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 2000)

            return null
        }

        // Photo Upload part
        let Authorization = ''
        const loggedUserJSON = JSON.parse(
            window.localStorage.getItem('loggedDSMapUser')
        )

        if (loggedUserJSON) {
            Authorization = `bearer ${loggedUserJSON.token}`
        }

        const data = await imageService.getUrl()

        if (!data) {
            return null
        }

        setUploadingStatus(true)

        await imageService.uploadImage(data.url, selectedFile)

        const imageURL = data.url.split('?')[0]

        setUploadedFile(imageURL)

        try {
            const newVisit = await visitService.addVisit({
                photoURL: imageURL,
                description: description.value,
                district: districtID,
                visitors: totalVisitors,
            })
            await districtService.updateOne(districtID)

            const districtName = districts.find(
                (district) => district.dbID === districtID
            ).name

            const updateDistrict = districts.find(
                (district) => district.name === districtName
            )
            updateDistrict.visitCount++

            setDistricts(
                districts.map((district) =>
                    district.name === districtName ? updateDistrict : district
                )
            )

            newVisit.district = {
                dbID: newVisit.district,
                name: districtName,
            }

            newVisit.visitors = newVisit.visitors.map((visitor) => {
                return {
                    id: visitor,
                    name: userOptions.find((users) => users.value === visitor)
                        .label,
                }
            })

            // State calls to render new state and set new state to context
            setUploadingStatus(false)

            setVisit([...visit, newVisit])
            setDistrictID(districtID)

            setMessageType('success')
            setMessage('Visit has been logged!')
            setTimeout(() => {
                setMessageType('error')
                setMessage(null)
            }, 4000)
            setDescription()
        } catch (error) {
            console.log(error)
        }
    }

    // Main component
    return (
        <>
            {message && (
                <Alert severity={messageType}>
                    <AlertTitle>
                        {messageType === 'error' ? 'Error' : 'Success'}
                    </AlertTitle>
                    {message}
                </Alert>
            )}
            <br />
            {!uploadingStatus && (
                <>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="subtitle2" gutterBottom>
                            District
                        </Typography>
                        <DistrictSelect
                            districtOptions={districtOptions}
                            defaultVal={defaultValue}
                        />
                        <br />
                        <Typography variant="subtitle2" gutterBottom>
                            Select Photo
                        </Typography>
                        <ImageUpload setSelectedFile={setSelectedFile} />
                        <br />
                        <br />
                        <Typography variant="subtitle2" gutterBottom>
                            Visit Highlights
                        </Typography>
                        <Input
                            {...description}
                            fullWidth
                            inputProps={{ maxLength: 200 }}
                            placeholder="Details of your visit within 200 characters"
                        />
                        <br />
                        <br />
                        <Typography variant="subtitle2" gutterBottom>
                            Colleagues in the visit
                        </Typography>
                        <UserSelect
                            userDefault={userDefault}
                            options={userOptions}
                        />
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Add to map
                        </Button>
                    </form>

                    <br />
                </>
            )}
            {uploadingStatus && <Loading />}
            {uploadedFile && !uploadingStatus && (
                <>
                    {districtID && (
                        <>
                            <Link
                                to={`/district/${
                                    districts.find(
                                        (district) =>
                                            district.dbID === districtID
                                    ).name
                                }`}
                            >
                                <Button variant="contained" color="secondary">
                                    Go to Uploaded Visit
                                </Button>
                            </Link>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default DistrictUpload
