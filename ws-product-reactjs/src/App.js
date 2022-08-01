import "./App.scss"
import {GraphPlots, Solutions} from './container'
import {POITable} from './components'


function App() {
  return (
    <div className="app">
       <Solutions>
        <GraphPlots/>
        <POITable url='http://localhost:5555/poi' />
       </Solutions>
    </div>
  );
}

export default App;
