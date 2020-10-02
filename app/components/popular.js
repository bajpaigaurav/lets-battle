import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

function LanguagesNav({ selectedLanguage, onUpdateLanguage }) {

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
        this.isLoading = this.isLoading.bind(this)
        this.state = {
            selectedLanguage: 'All',
            repos: {},
            error: null
        }
    }

    updateLanguage(selectedLanguage) {
        this.setState(
            {
                selectedLanguage,
                error: null,
            }
        )

        if (!this.state.repos[selectedLanguage]) {


            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({ repos }) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                }).catch((error) => {
                    console.warn('Error while fetching', error)
                    this.setState(
                        { error: 'there is an error' }
                    )

                })
            }
        

                    //     fetchPopularRepos(selectedLanguage)
                    // .then((repos) => {
                    //     this.setState({
                    //         repos,
                    //         error:null
                    //     })
                    // })
                    // .catch((error) => {
                    //     console.warn('Error while fetching', error)
                    //     this.setState(
                    //         {error: 'there is an error'}
                    //     )
                    // })

                

    


    }

        componentDidMount(){
            this.updateLanguage(this.state.selectedLanguage)
        }


        isLoading() {

            const { selectedLanguage, repos, error} = this.state

            return !repos[selectedLanguage] && error === null

           // return this.state.repos === null && this.state.error === null
        }


        render() {

            const { selectedLanguage, repos, error } = this.state
            return (

                <React.Fragment>
                    <LanguagesNav
                        selectedLanguage={selectedLanguage}
                        onUpdateLanguage={this.updateLanguage}
                    />

                    {this.isLoading() && <p>Loading..</p>}

                    {error && <p>{error}</p>}

                    {repos[selectedLanguage] && <pre> {JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
                </React.Fragment>
            )

        }
    }