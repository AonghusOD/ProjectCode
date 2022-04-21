import Temp from './Temp';
import Humidity from './Humidity';
import classes from './Climate.module.css';
import Card from '../layout/UI/Card';

function Climate(props) {
  return (
    <div className='column'>
        <Card>
          <Humidity />
          <Temp />
        </Card>
      </div>
  );
}

export default Climate;
