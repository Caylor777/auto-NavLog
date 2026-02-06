import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Buttons from './components/buttons.jsx';
import NavBar from './components/navBar.jsx';
import Row from './components/row.jsx';
import ShortcutsWindow from './components/shortcutsWindow.jsx';
import { fillColumn } from './js/setValues.js';

function App() {
  const [rowsData, setRowsData] = useState([{ id: 1, rowNumber: 1 }]);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const addRow = useCallback(() => {
    setRowsData(prev => {
      const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1;
      return [...prev, { id: nextId, rowNumber: nextId }];
    });
  }, []);

  const removeRow = useCallback(() => {
    setRowsData(prev => prev.slice(0, -1));
  }, []);

  useEffect(() => {
    const handleKeydown = (e) => {
      const isAsterisk = e.key === '*' || e.code === 'NumpadMultiply';
      const isEquals = e.key === '=' || e.code === 'NumpadEqual';
      const isMinus = e.key === '-' || e.code === 'NumpadSubtract';
      if (!isAsterisk && !isEquals && !isMinus) return;

      const active = document.activeElement;
      if (isAsterisk && active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
        console.log(`* pressed — focused element: id="${active.id}" value="${active.value}"`);
        fillColumn(active.id, active.value);
      }

      if (isEquals) {
        console.log("+ pressed");
        addRow();
      }

      if (isMinus) {
        console.log("- pressed");
        removeRow();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [addRow, removeRow]);


    
  //HTML Content
  return (
    <div>
      <NavBar onShortcutsClick={() => setShowShortcuts(true)} />
      {showShortcuts && <ShortcutsWindow onClose={() => setShowShortcuts(false)} />}
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
