import React from 'react'


export default class List extends React.Component {

    render() {

        const list = [
            {
                value: "A",
                id: 1
            },
            {
                value: "B",
                id: 2
            },
            {
                value: "C",
                id: 3
            },
            {
                value: "D",
                id: 4
            },
            {
                value: "E",
                id: 5
            },

        ]
        return (
            <ul>
                {list.map((e) => (
                    <li id={e.id}>
                        {e.value}
                    </li>
                ))}
            </ul>
        )
    }
}