import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// traditional Class Components
// class ClassComponent extends React.Component {
//   render() {
//     return <h2>Class Component</h2>
//   }
// }


// Card Component
// props {title} (Properties) a way to pass data from one component to another
const Card = ({ title }) => {
  return(
    <div style={{
      border: '1px solid #4b5362',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#31363f',
      borderRadius: '10px',
      minHeight: '100px'
    }}>
      <h2>{title} </h2>
    </div>
  )
}


// new js syntax Arrow Component
// <h2>Functional Arrow Component</h2>
// <Card title = "Star Wars" rating={5} isCool={true} actors={[{ name: 'Actors'}]}/>

const App = () => {
  return (
    <div className="card-container">
      <Card title = "Star Wars" rating={5} isCool={true} actors={[{ name: 'Actors'}]}/>
      <Card title = "Wars"/>
      <Card title = "Stars"/>
      
    </div>
  )
}

 


export default App
// Function Components
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }


