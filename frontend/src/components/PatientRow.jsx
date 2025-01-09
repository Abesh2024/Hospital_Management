const PatientRow = ({ patient, onRemove }) => {

    const handlePriorityChange = (event) => {
        // Update the patient's priority here
        console.log(`Priority for ${patient.name}: ${event.target.value}`);
      };


      const handleStatusChange = (event) => {
        // Update the patient's status here
        console.log(`Status for ${patient.name}: ${event.target.value}`);
      };
    return (
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-md">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-bold">{patient.id}</span>
          <div>
            <p className="text-sm font-medium">{patient.patient}</p>
            <p className="text-xs text-gray-400">Arrival: {patient.arrival}</p>
            <p className="text-xs text-gray-400">Est. Wait: {patient.waitTime}</p>
          </div>
        </div>
  
        <div className="flex items-center space-x-4">
          <select
            value={patient.status}
            className="bg-gray-700 text-gray-300 text-sm rounded-md p-1"
            onChange={handleStatusChange} // Added onChange

          >
            <option>Waiting</option>
            <option>With Doctor</option>
            <option>Completed</option>
          </select>
  
          <select
            value={patient.priority}
            className="bg-gray-700 text-gray-300 text-sm rounded-md p-1"
            onChange={handleStatusChange} // Added onChange

          >
            <option>Normal</option>
            <option>Urgent</option>
          </select>
  
          <button
            onClick={() => onRemove(patient.id)}
            className="p-2 bg-red-600 rounded-md text-sm"
          >
            X
          </button>
        </div>
      </div>
    );
  };
  
  export default PatientRow;
  