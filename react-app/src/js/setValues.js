import { WCA } from './calculations.js';
import { compassHeading } from './calculations.js';
import { magneticHeading } from './calculations.js';
import { timeEnroute } from './calculations.js';
import { fuelUsed } from './calculations.js';

function update() {
    let rowCount = document.getElementById("ouputTable").childElementCount;
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