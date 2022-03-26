import Temp from './Temp';
import Humidity from './Humidity';

function ClimatePage(props) {
  return (
    <div>
      <h1>Climate Reading Graphs</h1>
        <Humidity />
          <Temp />
        
      </div>
  );
}

export default ClimatePage;
