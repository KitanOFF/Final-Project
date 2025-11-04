import "./StatisticsCard.css";

function StatisticsCard() {

  const chartPath = "M20,120 Q60,110,80,90 Q110,60,145,70 Q185,135,220,135 Q260,135,290,100 Q330,40,370,100"; 

  return (
    <div>
    <h3>Overall statistic</h3>
    <div className="statistics-card">
      
      <div className="statistics-title">STATISTICS</div>
      <div className="statistics-label">Overall target accomplishment over the year</div>
      <div className="statistics-chart">
        <svg width="390" height="145" viewBox="0 0 390 145" fill="none">
          <g>
            
            <line x1="0" y1="135" x2="390" y2="135" stroke="#f5f6fa" strokeWidth="2"/>
            <line x1="0" y1="70" x2="390" y2="70" stroke="#f5f6fa" strokeWidth="2"/>
            
            <path d={chartPath} stroke="#716ffd" strokeWidth="3" fill="none" />
          </g>
         
          <text x="12" y="142" fill="#adb2c7" fontSize="11">Nov</text>
          <text x="46" y="142" fill="#adb2c7" fontSize="11">Dec</text>
          <text x="85" y="142" fill="#adb2c7" fontSize="11">Jan</text>
          <text x="126" y="142" fill="#adb2c7" fontSize="11">Feb</text>
          <text x="159" y="142" fill="#adb2c7" fontSize="11">Mar</text>
          <text x="202" y="142" fill="#adb2c7" fontSize="11">Apr</text>
          <text x="241" y="142" fill="#adb2c7" fontSize="11">May</text>
          <text x="282" y="142" fill="#adb2c7" fontSize="11">Jun</text>
          <text x="320" y="142" fill="#adb2c7" fontSize="11">Jul</text>
          <text x="358" y="142" fill="#adb2c7" fontSize="11">Aug</text>
          <text x="370" y="142" fill="#adb2c7" fontSize="11">Sep</text>
          <text x="370" y="142" fill="#adb2c7" fontSize="11">Oct</text>
        
          <text x="0" y="137" fill="#e1e1ec" fontSize="11">0</text>
          <text x="0" y="74" fill="#e1e1ec" fontSize="11">5,000</text>
        </svg>
      </div>
    </div>
    </div>
  );
}

export default StatisticsCard;
