import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      
      </div>
      
      
    </div>
    
  );
}

export default Layout;