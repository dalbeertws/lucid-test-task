import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();













// import { TextField } from "@mui/material";
// import React, { Fragment, useState } from "react";

// export default function InputSuggestion(props) {
//   const data = ["Watermelon", "Mango", "Apple", "Melon"];

//   const [suggestion, setSuggestion] = useState([]);
//   const [showSuggestion, setShowSuggestion] = useState(false);
//   const [userInput, setUserInput] = useState("");
//   const [hoveredCurrent, setHoveredCurrent] = useState(0);
//   const [hoveredBefore, setHoveredBefore] = useState(0);

//   const onChange = (e) => {
//     const { value } = e.target;

//     setUserInput(value);

//     // Filter suggestions based on the input value
//     const filteredSuggestion = data
//       .sort()
//       .filter((sugg) => sugg.toLowerCase().includes(value.toLowerCase()));

//     setSuggestion(filteredSuggestion);

//     setShowSuggestion(true);

//     if (value.length < 1) {
//       setShowSuggestion(false);
//       setHoveredCurrent(0);
//     }
//   };

//   const onKeyDown = (e) => {
//     /**
//      * keycode:
//      * 38 = arrow up
//      * 40 = arrow down
//      */

//     switch (e.keyCode) {
//       case 38:
//         e.preventDefault();
//         if (hoveredCurrent > 0) {
//           setHoveredCurrent(hoveredCurrent - 1);
//           setHoveredBefore(hoveredCurrent - 1);
//         } else {
//           setHoveredCurrent(suggestion.length - 1);
//           setHoveredBefore(suggestion.length - 1);
//         }
//         break;
//       case 40:
//         e.preventDefault();
//         if (hoveredCurrent < suggestion.length - 1) {
//           setHoveredCurrent(hoveredCurrent + 1);
//           setHoveredBefore(hoveredCurrent + 1);
//         } else {
//           setHoveredCurrent(0);
//           setHoveredBefore(0);
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   const onMouseEnter = () => {
//     setHoveredCurrent(-1);
//   };

//   const onMouseLeave = () => {
//     setHoveredCurrent(hoveredBefore);
//   };

//   const onClick = (text) => {
//     setUserInput(text);
//     setShowSuggestion(false);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <Fragment>
//       <form className="suggestion-form" onSubmit={onSubmit}>
//         <TextField
//           autoComplete="off"
//           className="suggestion-input"
//           type="text"
//           name="fruit"
//           value={userInput}
//           onChange={onChange}
//           onKeyDown={onKeyDown}
//           onFocus={onChange}
//         />
//         {showSuggestion && suggestion.length > 0 && (
//           <div className="suggestion-box">
//             {suggestion.map((text, i) => {
//               return (
//                 <p
//                   key={i}
//                   className={`suggestion-text ${i === hoveredCurrent &&
//                     "hovered"}`}
//                   onClick={() => onClick(text)}
//                   onMouseEnter={onMouseEnter}
//                   onMouseLeave={onMouseLeave}
//                 >
//                   {text}
//                 </p>
//               );
//             })}
//           </div>
//         )}
//       </form>
//     </Fragment>
//   );
// }





// import React, { useState } from 'react';
// import { Autocomplete, Button, Chip, Grid, TextField } from '@mui/material';
// import './App.css';

// const App = () => {
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [result, setResult] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const options = [
//     { label: 'Income', value: 200 },
//     { label: 'Expenses', value: 10 },
//     { label: 'Rent', value: 15 },
//     { label: 'Transport', value: 15 },
//     { label: '+', value: '+' },
//     { label: '-', value: '-' },
//     { label: '*', value: '*' },
//     { label: '/', value: '/' },
//   ];


//   const filterOptions = (options, { inputValue }) => {
//     return options.filter(
//       (option) =>
//         option.label.toLowerCase().includes(inputValue.toLowerCase())
//     );
//   };


//   const handleOptionChange = (_, newOptions) => {
//     setSelectedOptions(newOptions);
//   };

//   const validateExpression = () => {
//     for (let i = 0; i < selectedOptions.length - 1; i++) {
//       if (
//         ['+', '-', '*', '/'].includes(selectedOptions[i].value) &&
//         ['+', '-', '*', '/'].includes(selectedOptions[i + 1].value)
//       ) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const calculateResult = () => {
//     let expression = '';
//     for (const option of selectedOptions) {
//       expression += option.value;
//     }
//     try {
//       const evalResult = eval(expression);
//       setResult(evalResult.toString());
//     } catch (error) {
//       setErrorMessage("Please use valid values to perform the operation")
//     }
//   };

//   const handleSubmit = () => {
//     if (
//       selectedOptions.length >= 2 &&
//       selectedOptions.some((option) => ['+', '-', '*', '/'].includes(option.value)) &&
//       validateExpression()
//     ) {
//       setErrorMessage('');
//       calculateResult();
//     } else if (selectedOptions.length < 2) {
//       setErrorMessage('Please select at least two values.');
//     } else {
//       setErrorMessage('Please make sure each math operation has values on both sides.');
//     }
//   };

//   const handleDeleteChip = (chipToDelete) => () => {
//     setSelectedOptions((prevOptions) =>
//       prevOptions.filter((option) => option !== chipToDelete)
//     );
//   };

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12} sx={{ p: 5 }}>
//         <Autocomplete
//           multiple
//           options={options}
//           getOptionLabel={(option) => option.label}
//           onChange={handleOptionChange}
//           filterOptions={filterOptions}
//           value={selectedOptions}
//           renderTags={(value, getTagProps) =>
//             value.map((option, index) => (
//               <Chip
//                 key={index}
//                 variant="outlined"
//                 label={option.label}
//                 onDelete={handleDeleteChip(option)}
//               />
//             ))
//           }
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               variant="outlined"
//             />
//           )}
//         />
//         <br />
//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Calculate
//         </Button>
//         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//         {result && <p>Result: {result}</p>}
//       </Grid>F
//     </Grid>
//   );
// };

// export default App;




