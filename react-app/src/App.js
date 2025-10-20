import { useState } from 'react';
import './App.css';
import Buttons from './components/buttons.jsx';
import NavBar from './components/navBar.jsx';
import Row from './components/row.jsx';

function App() {
  const [rowsData, setRowsData] = useState([{ id: 1, rowNumber: 1 }]);

  function addRow() {
    const nextId = rowsData.length ? rowsData[rowsData.length - 1].id + 1 : 1;
    setRowsData([...rowsData, { id: nextId, rowNumber: nextId }]);
  }

  function removeRow() {
    setRowsData(rowsData.slice(0, -1));
  }

  return (
    <div>
      <NavBar />
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
              {rowsData.map((r) => (
                <Row key={r.id} rowNumber={r.rowNumber} />
              ))}
            </tbody>
            <tbody id="totalTable">
                <tr>
                    <th>Totals:</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th><label className="outputRows" id="totalDistanceOutput">--</label></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th><label className="outputRows" id="totalTimeEnRouteOutput">--:--</label></th>
                    <th><label className="outputRows" id="totalFuelUsedOutput">--</label></th>
                </tr>
            </tbody>
        </table>
      </div>
      <Buttons addPointFunction={addRow} removePointFunction={removeRow}/>
    </div>
  );
}

export default App;
