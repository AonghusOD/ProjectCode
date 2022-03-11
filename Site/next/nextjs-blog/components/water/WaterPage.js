import EC from "./EC";
import PH from "./PH";
import Card from '@nextui-org/react';

function Water(props) {
  return (
    <section>
      <h1>Water Reading Graphs</h1>
      <EC />
      <PH />
    </section>
  );
}

export default Water;
