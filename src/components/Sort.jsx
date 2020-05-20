import React from 'react'

export default class Sort extends React.Component{

    state = {
        sortStr: "All"
    }

    sortState = (evt) => {
        this.setState({
            sortStr: evt.target.value
        }, ()=>{this.passSort()})
    }

    passSort = () => {
        this.props.handleStateSort(this.state.sortStr)
    }

    render(){

        return(
            <div>
                <select onSubmit={this.passSort} onChange={this.sortState}>
                    <option value="All">All</option>
                    <option value="Description">Description</option>
                    <option value="Category">Category</option>
                </select>
            </div>
        )
    }
}