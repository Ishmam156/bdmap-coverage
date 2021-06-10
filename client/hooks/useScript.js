import { useEffect } from 'react'

// Run code to add district labels to the map based on the center position of map
const useScript = () => {
    useEffect(() => {
        const script = document.createElement('script')

        script.innerHTML = document
            .querySelectorAll('path')
            .forEach((country) => {
                let { x, y, width, height } = country.getBBox()

                let cx = x + width / 2

                // 2 edge cases were identified and have been dealth with separately
                if (country.getAttribute('name') === 'Jamalpur') {
                    cx = x + width / 3
                }

                let cy = y + height / 2

                if (country.getAttribute('name') === 'Lalmonirhat') {
                    cy = y + height / 1.5
                }

                let center = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'circle'
                )
                center.setAttribute('cx', cx)
                center.setAttribute('cy', cy)
                center.setAttribute('r', 5)
                center.setAttribute('fill', '#5f6e76')
                let name = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'text'
                )
                name.setAttribute('x', cx - 35)
                name.setAttribute('y', cy - 10)
                name.innerHTML = country.getAttribute('name')
                name.setAttribute('fill', '5f6e76')
                name.setAttribute('font-family', 'Roboto')
                name.setAttribute('font-size', '20px')
                name.setAttribute('font-weight', 'bold')

                if (!name.innerHTML.includes('island')) {
                    country.parentNode.parentNode.append(name, center)
                }
            })

        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])
}

export default useScript
