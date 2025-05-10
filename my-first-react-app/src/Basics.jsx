import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// traditional Class Components
// class varClassComponent extends React.Component {
//   render() {
//     return <h2>Class Component</h2>
//   }
// }


// Card Component
// props {title} (Properties) a way to pass data from one component to another
const Card = ({ title }) => {

  // State is like a react component brain that holds info about the component that can change over time
  // State is not persistent across browser reload
  // When State changes, react rerenders the component to reflect the new data
  const [hasLiked, setHasLiked] = useState(false);

  const [count, setCount] = useState(0);

  // When Strict Mode is on, useEffect runs twice when the component mounts/starts
  // Run the useEffect only when smth changes, use dependency array (deps), passed as second parameter.
  // React will see if The variable in deps is changed. If so, call the useEffect.
  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked]);

  // Common use of useEffect that runs only once on the mounting of that component, when first appears.
  // useEffect(() => {
  //   console.log('CARD RENDERED');
  // }, []);

  return(

    // in line css eg
    // <div style={{
    //   border: '1px solid #4b5362',
    //   padding: '20px',
    //   margin: '10px',
    //   backgroundColor: '#31363f',
    //   borderRadius: '10px',
    //   minHeight: '100px'
    // }}>

    // Not recommended to update the value of the State by using the State itself (count). onClick={() => setCount(count + 1)}
    <div className = "card" onClick={() => setCount((prevState) => prevState + 1)}>

      {/* Conditional Rendering. {count ? count : null} */}
      <h2>{title} <br/> {count || null} </h2>

      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? '❤️' : '🤍' }
      </button>
    </div>
  )
}


// new js syntax Arrow Component
// <h2>Functional Arrow Component</h2>
// <Card title = "Star Wars" rating={5} isCool={true} actors={[{ name: 'Actors'}]}/>

const Basics = () => {
  



  return (
    <div className="card-container">
      <Card title = "Star Wars" rating={5} isCool={true} actors={[{ name: 'Actors'}]}/>
      <Card title = "Wars"/>
      <Card title = "Stars"/>
      
    </div>
  )
}



export default Basics
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


