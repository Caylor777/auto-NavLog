    function WCA(windDirection, windSpeed, trueCourse, trueAirSpeed) {
        const crossWindAngle = windSpeed * Math.sin(radians(windDirection - trueCourse));
        console.log(crossWindAngle);
        const windCorrectionAngle = degrees(Math.asin(crossWindAngle / trueAirSpeed));
        const groundSpeed = Math.sqrt(
        trueAirSpeed ** 2 + windSpeed ** 2 -
        2 * trueAirSpeed * windSpeed * Math.cos(radians(trueCourse - windDirection + windCorrectionAngle))
        );
        const trueHeading = confirCompassHeading(trueCourse + windCorrectionAngle);

        return {
            WCA: Math.round(windCorrectionAngle),
            TH: Math.round(trueHeading),
            GS: Math.round(groundSpeed)
        };
    }
        
    function compassHeading(magneticHeading, compassDeviation) {
        let compassHeading = confirCompassHeading(magneticHeading + compassDeviation)
        return Math.round(compassHeading)
    }

    function magneticHeading(trueHeading, variation){
        let magneticHeading = confirCompassHeading(trueHeading + variation)
        return Math.round(magneticHeading)
    }
        
    function confirCompassHeading(heading){
        if (heading < 0) {
            heading += 360
            return (heading)
        }

        return (heading -= 360)
    }
        
    function timeEnroute(distance, groundSpeed){
        let timeEnroute = distance / groundSpeed
        let timeEnrouteHours = timeEnroute
        let hours = timeEnroute
        let minutes = (timeEnroute - hours) * 60
        let seconds = (minutes - (minutes)) * 60
        minutes = minutes + (hours * 60)
        let output = {"time" : `${Math.floor(minutes)}:${Math.round(seconds).toString().padStart(2, '0')}`, "hrs" : timeEnrouteHours}
        return (output)
    }
        
    function fuelUsed(fuelFlow, timeEnrouteHours){
        let fuelUsed = fuelFlow * timeEnrouteHours
        return (Math.round(fuelUsed * 100) / 100)
    }

    function radians(degrees) {
        return (degrees * (Math.PI / 180));
    }

    function degrees(radians) {
        return (radians * (180 / Math.PI));
    }

    export { WCA, compassHeading, magneticHeading, timeEnroute, fuelUsed };