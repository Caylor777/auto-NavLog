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
            console.log("update executed");

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
        
    let totals = total(rowCount);
    SetValue("totalDistanceOutput", totals["totalDistance"]);
    SetValue("totalTimeEnRouteOutput", totals["totalTime"]);
    SetValue("totalFuelUsedOutput", totals["totalFuel"]);
}

function SetValue(id, value) {
    document.getElementById(id).innerText = value;
}

function GetValue(id) {
    let value = document.getElementById(id).value;
    return value === "" ? null : Number(value);
}

function total(rowCount) {
    let totalDistance = 0;
    let totalTimeMins = 0;
    let totalTimeSecs = 0;
    let totalTimeMinsOverflow = 0;
    let totalFuel = 0;
    for (let j = 1; j <= rowCount; j++) {
        if (!(GetValue(`distanceInput${j}`) === "--")) {
            totalDistance += GetValue(`distanceInput${j}`)
        }
        if (!(document.getElementById(`timeEnRouteOutput${j}`).innerText === "--:--")) {
            let time = document.getElementById(`timeEnRouteOutput${j}`).innerText.split(":")
            totalTimeMins += Number(time[0]);
            totalTimeSecs += Number(time[1]);
            totalTimeMinsOverflow += Math.floor(totalTimeSecs / 60);
            totalTimeSecs = totalTimeSecs % 60;
            totalTimeMins += totalTimeMinsOverflow;
        }
        if (!(document.getElementById(`fuelUsedOutput${j}`).innerText === "--")) {
            totalFuel += Number(document.getElementById(`fuelUsedOutput${j}`).innerText)
        }   
    }

    return {
        "totalDistance": totalDistance,
        "totalTime" : `${totalTimeMins}:${String(totalTimeSecs).padStart(2, '0')}`,
        "totalFuel": Math.round(totalFuel * 100) / 100
    };
}

function asteriskPress() {
    document.addEventListener('keydown', (e) => {
            const isAsterisk = e.key === '*' || e.code === 'NumpadMultiply';
            if (!isAsterisk) return;

            const active = document.activeElement;
            if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
                console.log(`* pressed — focused element: id="${active.id}" value="${active.value}"`);
                fillColumn(active.id, active.value);
            }
        });
    }

    // initialize the listener
    asteriskPress();
    
function fillColumn(startId, value) {
    const rowCount = document.getElementById("ouputTable").childElementCount;
    let startNumber = parseInt(startId.replace( /^\D+/g, ''));
    let id = startId.replace(startNumber, '');
    for (let i = startNumber; i <= rowCount; i++) {
        document.getElementById(`${id}${i}`).value = value;
        update();
    }
}

export { update };