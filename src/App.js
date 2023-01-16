import Todos from "./components/Todos";
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.app}>
      <Todos />
    </div>
  );
}

export default App;
