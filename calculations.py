import math
class calculations:
    def WCA(self, windDirection, windSpeed, trueCourse, trueAirSpeed):
            crossWindAngle = windSpeed * math.sin(math.radians(windDirection - trueCourse))
            headwindAngle = math.degrees(windSpeed * math.cos(math.radians(windDirection - trueCourse)))
            windCorrectionAngle = math.degrees(math.asin(crossWindAngle / trueAirSpeed))
            groundSpeed = trueAirSpeed - headwindAngle
            trueHeading = self.confirCompassHeading(trueCourse + windCorrectionAngle)
            return {"WCA":round(windCorrectionAngle), "TH":round(trueHeading), "GS":round(groundSpeed)}
        
    def compassHeading(self, magneticHeading, compassDeviation):
        compassHeading = self.confirCompassHeading(magneticHeading + compassDeviation)
        return round(compassHeading)
        
    def magneticHeading(self, trueHeading, variation):
        magneticHeading = self.confirCompassHeading(trueHeading + variation)
        return round(magneticHeading)
        
    def confirCompassHeading(self, heading):
        if heading < 0:
            heading += 360
        elif heading >= 360:
            heading -= 360
        return heading
        
    def timeEnroute(self, distance, groundSpeed):
        timeEnroute = distance / groundSpeed
        timeEnrouteHours = timeEnroute
        hours = int(timeEnroute)
        minutes = (timeEnroute - hours) * 60
        seconds = (minutes - int(minutes)) * 60
        minutes = minutes + (hours * 60)
        return {"time":f"{int(minutes)}:{int(seconds):02d}", "hrs":timeEnrouteHours}
        
    def fuelUsed(self, fuelFlow, timeEnrouteHours):
        fuelUsed = fuelFlow * timeEnrouteHours
        return round(fuelUsed, 2)