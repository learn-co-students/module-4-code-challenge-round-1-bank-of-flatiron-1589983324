import React, { Component } from 'react'

export class Sort extends Component {
     
  
    handleThisSort = (evt) => {

        this.props.handleSort(evt.target.value)
    }

    render() {
        return (
            <div style={{marginTop : "20px"}}>
               
                <label htmlFor = "Sort">
                Sort Alphabetically
                <select style={{marginLeft : "5px"}} value = {this.props.sort} onChange={this.handleThisSort}>
                <option value="All">All</option>
                <option value="Description">Description</option>
                <option value="Category">Category</option> 
                </select>
                </label>
            </div>
        )
    }
}

export default Sort
