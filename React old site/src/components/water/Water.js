import EC from "./EC";
import PH from "./PH";
import classes from "./Water.module.css";
import Card from "../layout/UI/Card";

function Water(props) {
  return (
    <div className='column'>
        <Card>
         <EC />
          <PH />
          <div align="center">Also add water temperture here!</div>
        </Card>
      </div>
  );
}

export default Water;
