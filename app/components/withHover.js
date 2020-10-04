
// import React from 'react'

// export default function withHover(Component, propName='hovering') {
//     return class WithHover extends React.Component {
//         constructor(props) {
//             super(props)
//             this.state = {
//                hovering: null
//             }

//             this.mouseOver = this.mouseOver.bind(this)
//             this.mouseOut = this.mouseOut.bind(this)
//         }

//         mouseOver(id) {
//             this.setState({
//                 hovering: true
//             })
//         }

//         mouseOut(id) {
//             // console.log('mouse out')
//             this.setState({
//                 hovering: false
//             })
//             // console.log(this.state)
//         }
//         render() {

//             console.log(this.props)
//             const props = {
//                 [propName] : this.state.hovering,
//                 ...this.props
//             }
//             console.log(props)
//             return (
//                 <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
//                     <Component {...props}></Component>
//                 </div>
//             )
//         }
//     }
// }

import React from 'react'

export default class Hover extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hovering: false,
    }

    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)
  }
  mouseOver() {
    this.setState({
      hovering: true
    })
  }
  mouseOut() {
    this.setState({
      hovering: false
    })
  }
  render () {
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.children(this.state.hovering)}
      </div>
    )
  }
}