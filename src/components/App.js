import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'



class App extends React.Component {
  
  constructor() {
    super()
    
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (petFilter) => {
    this.setState({
      filters: {type: petFilter} // a patch request to the component
    })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type != 'all'){
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(res => res.json())
        .then(filteredPetArray => {
          this.setState({
            pets: filteredPetArray
          })
        })
    }
    else {
      fetch('/api/pets')
        .then(res => res.json())
        .then(allPets => {
          this.setState({
            pets: allPets
          })
        })
    }
    
  }

  // this is only getting that specific pet
  onAdoptPet = (petID) => {
    let singlePet = this.state.pets.find(pet => 
      pet.id === petID
    )
    singlePet.isAdopted = true
    // console.log(singlePet.isAdopted)
    // debugger
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              pets={this.state.pets}
              onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
