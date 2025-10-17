import { WCA } from './calculations.js';
import { compassHeading } from './calculations.js';
import { magneticHeading } from './calculations.js';
import { timeEnroute } from './calculations.js';
import { fuelUsed } from './calculations.js';

function update() {
    const rowCount = document.getElementById("ouputTable").childElementCount;

    for (let i = 1; i <= rowCount; i++) {
        if (!((GetValue(`windDirectionInput${i}`) == null) || (GetValue(`windSpeedInput${i}`) == null) || (GetValue(`trueCourseInput${i}`) == null) || (GetValue(`trueAirSpeedInput${i}`) == null))) {
            let result = WCA(
                GetValue(`windDirectionInput${i}`),
                GetValue(`windSpeedInput${i}`),
                GetValue(`trueCourseInput${i}`),
                GetValue(`trueAirSpeedInput${i}`)
            );

            SetValue(`wcaOutput${i}`, result["WCA"]);
            SetValue(`trueHeadingOutput${i}`, result["TH"]);
            SetValue(`groundSpeedOutput${i}`, result["GS"]);

            if (!((GetValue(`distanceInput${i}`) == null))) {
                let result = timeEnroute(
                GetValue(`distanceInput${i}`),
                Number(document.getElementById(`groundSpeedOutput${i}`).innerText)
                );
                SetValue(`timeEnRouteOutput${i}`, result["time"]);
            }

            if (!((GetValue(`variationInput${i}`) == null))) {
                let result = magneticHeading(
                Number(document.getElementById(`trueHeadingOutput${i}`).innerText),
                GetValue(`variationInput${i}`)
                );
                SetValue(`magneticHeadingOutput${i}`, result);
            }

            if (!((GetValue(`fuelFlowInput${i}`) == null))) {
                let hours = timeEnroute(GetValue(`distanceInput${i}`), Number(document.getElementById(`groundSpeedOutput${i}`).innerText));
                hours = hours["hrs"]
                let result = fuelUsed(
                GetValue(`fuelFlowInput${i}`),
                hours
                );
                SetValue(`fuelUsedOutput${i}`, result);
            }
        }
    }
        
    let totalDistance = 0
    let totalTime = 0
    let totalFuel = 0
    for (let j = 1; j <= rowCount; j++) {
        if (!(GetValue(`distanceInput${j}`) == null)) {
            totalDistance += GetValue(`distanceInput${j}`)
        }
        if (!(document.getElementById(`timeEnRouteOutput${j}`).innerText === "--:--")) {
            let time = document.getElementById(`timeEnRouteOutput${j}`).innerText.split(":")
            totalTime += (Number(time[0]) / 60) + (Number(time[1]) / 3600)
        }
        if (!(document.getElementById(`fuelUsedOutput${j}`).innerText === "--")) {
            totalFuel += Number(document.getElementById(`fuelUsedOutput${j}`).innerText)
        }
    }
}

function SetValue(id, value) {
    document.getElementById(id).innerText = value;
}

function GetValue(id) {
    let value = document.getElementById(id).value;
    return value === "" ? null : Number(value);
}

export { update };