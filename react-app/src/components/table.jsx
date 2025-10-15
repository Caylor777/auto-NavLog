function Table() {
    return (
        <div id="pointsTable">
        <table>
            <thead>
                <tr id="tableLabel">
                    <th>True Course</th>
                    <th>True Air Speed</th>
                    <th>Wind Direction</th>
                    <th>Wind Speed</th>
                    <th>Variation</th>
                    <th>Fuel Flow (gph)</th>
                    <th>Distance</th>
                    <th>WCA</th>
                    <th>True Heading</th>
                    <th>Magnetic Heading</th>
                    <th>Ground Speed</th>
                    <th>Time EnRoute</th>
                    <th>Fuel Used</th>
                </tr>
            </thead>
            <tbody id="ouputTable">
                <tr>
                    <th><input type="number" class="inputRows" id="trueCourseInput" placeholder="000" min="0" max="360" /></th>
                    <th><input type="number" class="inputRows"id="trueAirSpeedInput" placeholder="000" min="0" /></th>
                    <th><input type="number" class="inputRows"id="windDirectionInput" placeholder="000" min="0" max="360" /></th>
                    <th><input type="number" class="inputRows"id="windSpeedInput" placeholder="00" min="0" /></th>
                    <th><input type="number" class="inputRows"id="variationInput" placeholder="00" min="0" max="360" /></th>
                    <th><input type="number" class="inputRows"id="fuelFlowInput" placeholder="00" min="0" /></th>
                    <th><input type="number" class="inputRows"id="distanceInput" placeholder="00" min="0" /></th>
                    <th><label class="outputRows" id="wcaOutput">--</label></th>
                    <th><label class="outputRows" id="trueHeadingOutput">--</label></th>
                    <th><label class="outputRows" id="magneticHeadingOutput">--</label></th>
                    <th><label class="outputRows" id="groundSpeedOutput">--</label></th>
                    <th><label class="outputRows" id="timeEnRouteOutput">--:--</label></th>
                    <th><label class="outputRows" id="fuelUsedOutput">--</label></th>
                </tr>
            </tbody>
            <tbody id="totalTable">
                <tr>
                    <th>Totals:</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th><label class="outputRows" id="totalDistanceOutput">--</label></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th><label class="outputRows" id="totalTimeEnRouteOutput">--:--</label></th>
                    <th><label class="outputRows" id="totalFuelUsedOutput">--</label></th>
                </tr>
            </tbody>
        </table>
    </div>
    );
}

export default Table;