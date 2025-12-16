import React from 'react';
import './GeneralPerformance.css';
import Button from 'react-bootstrap/Button';

function GeneralPerformance() {
  return (
    <div className="gp-container">
      <h1 className="gp-title text-center">General Performance & Grade</h1>
      
      <table className="gp-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Performance</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>***</td>
            <td>
              <div className="radio-group">
                <label><input type="radio" name="performance" /> Good</label>
                <label><input type="radio" name="performance" /> Average</label>
                <label><input type="radio" name="performance" /> Poor</label>
              </div>
            </td>

            <td>
              <input type="number" className="score-input" placeholder="0 - 100" />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="submit-area text-center mt-4">
        <Button variant="outline-success" className="submit-btn">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default GeneralPerformance;
