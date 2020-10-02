import React from 'react'
import PropTypes from 'prop-types'

function LanguagesNav ( {selectedLanguage, onUpdateLanguage}) {

    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (

        <ul className='flex-center'>
            {languages.map((language) => (

                <li key={language}>
                    <button className='btn-clear nav-link'
                        style={language === selectedLanguage ?
                            { color: 'rgb(187,46,31)' } : null}
                        onClick={() => onUpdateLanguage(language)}
                    >
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired,
}


export default class Popular extends React.Component {

    constructor(props) {
        super(props)

        this.updateLanguage = this.updateLanguage.bind(this)
        this.state = {
            selectedLanguage: 'All'
        }
    }

    updateLanguage(selectedLanguage) {
        this.setState(
            {
                selectedLanguage
            }
        )
    }

    render() {

        const { selectedLanguage } = this.state
        return (

           <LanguagesNav 
           
           selectedLanguage = {selectedLanguage}
           onUpdateLanguage = {this.updateLanguage}
           
           />
        )

    }
}