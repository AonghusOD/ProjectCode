import { createContext, useState, useEffect } from 'react';

const initialDataState = {
    noEmployees: '25'
}
const DataContext = createContext(initialDataState);

export function DataContextProvider(props) {
    const [dataObj, setDataObj] = useState(initialDataState)

    useEffect(() => {
        fetch('api/getData')
        .then((res) => res.json())
        .then((data) => {
            setDataObj((oldDataObj) => {
                let prevDataObj = JSON.parse(JSON.stringify(oldDataObj))
                prevDataObj.noEmployees = data.noEmployees
                return prevDataObj
            });
        })
      }, []); 

    // see https://nextjs.org/docs/basic-features/data-fetching/client-side
    function getNoEmployees() {
        return dataObj.noEmployees
    }

    async function setNoEmployees(theNewNumber)  {
        const response = await fetch('api/setData', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({noEmployees: theNewNumber}) 
        });

        setDataObj((oldDataObj) => {
            let prevDataObj = JSON.parse(JSON.stringify(oldDataObj))
            prevDataObj.noEmployees = theNewNumber
            return prevDataObj
        });
    }

    const context = {
        getNoEmployees: getNoEmployees,
        setNoEmployees: setNoEmployees
    };

    return (
        <DataContext.Provider value={context}>
            {props.children}
        </DataContext.Provider>
    );
}

export default DataContext;