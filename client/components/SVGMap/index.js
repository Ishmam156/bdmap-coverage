import React from 'react'
import { Link } from 'react-router-dom'
import useScript from '../../hooks/useScript'

const SVGMap = (props) => {
    const districtLength = props.districts.length === 0

    // Run script once district API has been pulled to add labels
    if (!districtLength) {
        useScript()
    }

    const mobileWidth = window.innerWidth

    return (
        <>
            {!districtLength && (
                <>
                    {/* Check manually for mobileWidth since Safari requires an explicit width value */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox={props.viewBox}
                        className={props.className}
                        role={props.role}
                        aria-label={props.label}
                        width={
                            mobileWidth >= 3000
                                ? '2000'
                                : mobileWidth >= 1500
                                ? '1000'
                                : mobileWidth >= 1300
                                ? '1100'
                                : mobileWidth >= 1200
                                ? '950'
                                : mobileWidth >= 1000
                                ? '950'
                                : mobileWidth >= 900
                                ? '680'
                                : mobileWidth >= 800
                                ? '720'
                                : mobileWidth >= 700
                                ? '600'
                                : mobileWidth >= 600
                                ? '500'
                                : mobileWidth >= 500
                                ? '400'
                                : mobileWidth >= 400
                                ? '380'
                                : mobileWidth >= 350
                                ? '320'
                                : '200'
                        }
                    >
                        {props.childrenBefore}
                        {props.districts.map((location, index) => {
                            if (!location.name.includes('island')) {
                                return (
                                    <Link
                                        to={`/district/${location.name}`}
                                        key={location.id}
                                    >
                                        <path
                                            id={location.id}
                                            name={location.name}
                                            d={location.path}
                                            className={
                                                location.visitCount > 2
                                                    ? `${props.locationClassName}-2`
                                                    : `${props.locationClassName}-${location.visitCount}`
                                            }
                                            tabIndex={
                                                typeof props.locationTabIndex ===
                                                'function'
                                                    ? props.locationTabIndex(
                                                          location,
                                                          index
                                                      )
                                                    : props.locationTabIndex
                                            }
                                            role={props.locationRole}
                                            aria-label={
                                                typeof props.locationAriaLabel ===
                                                'function'
                                                    ? props.locationAriaLabel(
                                                          location,
                                                          index
                                                      )
                                                    : location.name
                                            }
                                            aria-checked={
                                                props.isLocationSelected &&
                                                props.isLocationSelected(
                                                    location,
                                                    index
                                                )
                                            }
                                            onMouseOver={
                                                props.onLocationMouseOver
                                            }
                                            onMouseOut={
                                                props.onLocationMouseOut
                                            }
                                            onMouseMove={
                                                props.onLocationMouseMove
                                            }
                                            onClick={props.onClick}
                                            onKeyDown={props.onLocationKeyDown}
                                            onFocus={props.onLocationFocus}
                                            onBlur={props.onLocationBlur}
                                        />
                                    </Link>
                                )
                            }

                            return (
                                <React.Fragment key={location.id}>
                                    <path
                                        id={location.id}
                                        name={location.name}
                                        d={location.path}
                                        className={
                                            typeof props.locationClassName ===
                                            'function'
                                                ? props.locationClassName(
                                                      location,
                                                      index
                                                  )
                                                : props.locationClassName
                                        }
                                        tabIndex={
                                            typeof props.locationTabIndex ===
                                            'function'
                                                ? props.locationTabIndex(
                                                      location,
                                                      index
                                                  )
                                                : props.locationTabIndex
                                        }
                                        role={props.locationRole}
                                        aria-label={
                                            typeof props.locationAriaLabel ===
                                            'function'
                                                ? props.locationAriaLabel(
                                                      location,
                                                      index
                                                  )
                                                : location.name
                                        }
                                        aria-checked={
                                            props.isLocationSelected &&
                                            props.isLocationSelected(
                                                location,
                                                index
                                            )
                                        }
                                        onMouseOver={props.onLocationMouseOver}
                                        onMouseOut={props.onLocationMouseOut}
                                        onMouseMove={props.onLocationMouseMove}
                                        onClick={props.onClick}
                                        onKeyDown={props.onLocationKeyDown}
                                        onFocus={props.onLocationFocus}
                                        onBlur={props.onLocationBlur}
                                    />
                                </React.Fragment>
                            )
                        })}

                        {props.childrenAfter}
                    </svg>
                </>
            )}
        </>
    )
}

export default SVGMap
