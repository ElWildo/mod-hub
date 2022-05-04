import { Component } from 'react';
import { Link } from 'react-router-dom'
import './styles/modelem.css'

export default class ModElem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            style: null,
        };
    }

    componentDidMount() {
        this.setState({
            style: {
                backgroundImage: 'url(' + this.props.data.thumbnail + ')'
            }
        })
    }

    render() {
        return (
            <Link to={'mod/'+this.props.data.id} className='modElem' style={this.state.style}>
                <div className='modTitle'>{this.props.data.title}</div>
            </Link>
        )
    }
}