import { update } from '../js/setValues.js';

function Row(props) {
    return (
        <tr>
            <th><input onInput={update} type="number" className="inputRows" id={`trueCourseInput${props.rowNumber}`} placeholder="000" min="0" max="360" /></th>
            <th><input onInput={update} type="number" className="inputRows"id={`trueAirSpeedInput${props.rowNumber}`} placeholder="000" min="0" /></th>
            <th><input onInput={update} type="number" className="inputRows"id={`windDirectionInput${props.rowNumber}`} placeholder="000" min="0" max="360" /></th>
            <th><input onInput={update} type="number" className="inputRows"id={`windSpeedInput${props.rowNumber}`} placeholder="00" min="0" /></th>
            <th><input onInput={update} type="number" className="inputRows"id={`variationInput${props.rowNumber}`} placeholder="00" /></th>
            <th><input onInput={update} type="number" className="inputRows"id={`fuelFlowInput${props.rowNumber}`} placeholder="00" min="0" /></th>
            <th><input onInput={update} type="number" className="inputRows"id={`distanceInput${props.rowNumber}`} placeholder="00" min="0" /></th>
            <th><label className="outputRows" id={`wcaOutput${props.rowNumber}`}>--</label></th>
            <th><label className="outputRows" id={`trueHeadingOutput${props.rowNumber}`}>--</label></th>
            <th><label className="outputRows" id={`magneticHeadingOutput${props.rowNumber}`}>--</label></th>
            <th><label className="outputRows" id={`groundSpeedOutput${props.rowNumber}`}>--</label></th>
            <th><label className="outputRows" id={`timeEnRouteOutput${props.rowNumber}`}>--:--</label></th>
            <th><label className="outputRows" id={`fuelUsedOutput${props.rowNumber}`}>--</label></th>
        </tr>
    );
}

export default Row;