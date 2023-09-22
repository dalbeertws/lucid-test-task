import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CodeMirror from "@uiw/react-codemirror";
import {
  autocompletion,
  completeFromList,
  CompletionSource,
  CompletionContext,
  CompletionResult
} from "@codemirror/autocomplete";
import { styleTags, tags, Tag, HighlightStyle } from "@codemirror/highlight";
import '../App.css';


const Home = () => {
  const [totalValue, setTotalValue] = useState(0)
  const [inputValues, SetInputValues] = useState([
    {
      "id": "monthly_churn_rate",
      "name": "Monthly Churn Rate",
      "value": "4",
      "type": "number"
    },
    {
      "id": "initial_customer_count",
      "name": "Initial Customer Count",
      "value": "50",
      "type": "number"
    },
    {
      "id": "monthly_contract_value",
      "name": "Monthly Contract Value",
      "value": "25",
      "type": "number"
    },
    {
      "id": "monthly_new_customers",
      "name": "Monthly New Customers",
      "value": "10",
      "type": "number"
    }
  ])
  const [code, setCode] = React.useState(" monthly_churn_rate(4)");
  const [result, setResult] = React.useState(null);
  const [valueForSelectBox, setValueForSelectBox] = useState([]);

  function formatOutputData(inputData) {
    return inputData
      .filter(item => item.type === "number")
      .map(item => `${item.id}(${item.value})`);
  }

  const FormattedAutocompleteData = formatOutputData(inputValues);
  const myComplete = autocompletion({
    override: [completeFromList(FormattedAutocompleteData)]
  });

  const handleToChangeInputValues = (id, value) => {
    const regex = /^[0-9]*$/;
    // if (/^\d*\.?\d*$/.test(value)) { 

    if (regex.test(value)) {
      SetInputValues(prevInputValues => {
        const updatedInputValues = prevInputValues.map(item => {
          if (item.id === id) {
            return { ...item, value };
          }
          return item;
        });
        return updatedInputValues;
      })
      let regex = new RegExp(`${id}\\(\\d+\\)`, 'g');
      let newCode = code.replace(regex, `${id}(${value.length === 0 ? "0":value})`);
      setCode(newCode)
      setResult(calculateExpression(newCode))
    }
  }

  useEffect(() => {
    setValueForSelectBox(inputValues)
    // setValueForSelectBox([...inputValues, ...expressionsValues])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues])


  ///////////////////////////////////////////////////////////


  function calculateExpression(expression) {
    try {
      const tokens = expression.match(/(\w+\(\d+\)|\d+\.\d+|\d+|[+\-*/()])/g);

      if (!tokens) {
        throw new Error('Invalid expression');
      }

      const operatorStack = [];
      const operandStack = [];

      const functionImplementations = {
        "monthly_churn_rate": (arg) => arg,
        "initial_customer_count": (arg) => arg,
        "monthly_contract_value": (arg) => arg,
        "monthly_new_customers": (arg) => arg,
      };

      for (const token of tokens) {
        if (/^[+\-*/()]$/.test(token)) {
          while (
            operatorStack.length &&
            operatorStack[operatorStack.length - 1] !== '(' &&
            getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(token)
          ) {
            processOperator(operatorStack, operandStack);
          }
          if (token === ')') {
            if (operatorStack[operatorStack.length - 1] === '(') {
              operatorStack.pop();
            } else {
              throw new Error('Mismatched parentheses');
            }
          } else {
            operatorStack.push(token);
          }
        } else {
          if (/\w+\(\d+\)/.test(token)) {
            // Handle function calls
            const matches = token.match(/(\w+)\((\d+)\)/);
            if (matches) {
              const [, functionName, numberStr] = matches;
              const number = parseInt(numberStr, 10);
              if (functionImplementations[functionName]) {
                const result = functionImplementations[functionName](number);
                operandStack.push(result);
              } else {
                throw new Error(`Unknown function: ${functionName}`);
              }
            } else {
              throw new Error(`Invalid function call: ${token}`);
            }
          } else {
            operandStack.push(parseFloat(token));
          }
        }
      }

      while (operatorStack.length) {
        if (operatorStack[operatorStack.length - 1] === '(') {
          throw new Error('Mismatched parentheses');
        }
        processOperator(operatorStack, operandStack);
      }

      if (operandStack.length !== 1) {
        throw new Error('Invalid expression');
      }

      return operandStack[0];
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }

  function getPrecedence(operator) {
    switch (operator) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      default:
        return 0;
    }
  }

  function processOperator(operatorStack, operandStack) {
    const operator = operatorStack.pop();
    const rightOperand = operandStack.pop();
    const leftOperand = operandStack.pop();

    switch (operator) {
      case '+':
        operandStack.push(leftOperand + rightOperand);
        break;
      case '-':
        operandStack.push(leftOperand - rightOperand);
        break;
      case '*':
        operandStack.push(leftOperand * rightOperand);
        break;
      case '/':
        operandStack.push(leftOperand / rightOperand);
        break;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }


  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: '50px', paddingBottom: '50px' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {inputValues.map((item) => {
              return <>
                <div className='form_dv'>
                  <label htmlFor={`input_values${item.id}`}>{item.name}</label>
                  <input
                    id={`input_values${item.id}`}
                    type={item.type}
                    value={item.value}
                    onChange={(e) => { handleToChangeInputValues(item.id, e.target.value) }}
                  />
                </div>
              </>
            })}
          </Grid>
          <Grid item xs={9}>
            <div>
              <div style={{ width: '500px', border: '1px solid black' }}>
                <CodeMirror
                  value={code}
                  height="40px"
                  style={{
                    fontSize: 14,
                  }}
                  options={{
                    linerWrapping: true,
                    lint: true,
                    theme: 'material',
                    lineNumbers: true,
                    autoCloseBrackets: true,
                  }}
                  basicSetup={{
                    lineNumbers: false,
                    foldGutter: false
                  }}
                  extensions={[myComplete]}
                  onChange={(value, viewUpdate) => {
                    setResult(calculateExpression(value));
                    setCode(value);
                  }}
                // onBeforeChange={(editor, data, value) => {
                //   setCode(value);
                // }}
                />
              </div>

              <div>
                Output = {result}
              </div>

            </div>
          </Grid>
        </Grid>
      </Container>

    </>
  )
}

export default Home