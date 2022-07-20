import { createContext, useState, useEffect } from 'react';

const initialDataState = {
    noMessages: '25'
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
                prevDataObj.noMessages = data.noMessages
                return prevDataObj
            });
        })
      }, []); 

    // see https://nextjs.org/docs/basic-features/data-fetching/client-side
    function getNoMessages() {
        return dataObj.noMessages
    }

    async function setNoMessages(theNewNumber)  {
        const response = await fetch('api/setData', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({noMessages: theNewNumber}) 
        });

        setDataObj((oldDataObj) => {
            let prevDataObj = JSON.parse(JSON.stringify(oldDataObj))
            prevDataObj.noMessages = theNewNumber
            return prevDataObj
        });
    }

    const context = {
        getNoMessages: getNoMessages,
        setNoMessages: setNoMessages
    };

    return (
        <DataContext.Provider value={context}>
            {props.children}
        </DataContext.Provider>
    );
}

export default DataContext;