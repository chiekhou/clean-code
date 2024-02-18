import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import styles from './App.module.scss';
import Card from "./pages/Card";

function App() {
  return (
    <>
    <div className={`d-flex flex-column ${styles.appContainer}`}>
     
      <div className="flex-fill d-flex flex-column">
        <Suspense>
          <Outlet />
        </Suspense>
        <Card/>
      </div>
 
    </div>
</>
  );
}

export default App;
