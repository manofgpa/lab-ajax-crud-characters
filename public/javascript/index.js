const charactersAPI = new APIHandler('http://localhost:8000')

const clearCharactersContainer = () => {
  document.getElementsByClassName('characters-container')[0].innerHTML = ''
}

const insertCharacterToContainer = (character, id) => {
  document.getElementsByClassName(id)[0].innerHTML += `<div class="character-info">
        <div class="id"><strong>Id:</strong><span>${character.id}</span></div>
        <div class="name"><strong>Name:</strong><span>${character.name}</span></div>
        <div class="occupation"><strong>Occupation:</strong><span>${character.occupation}</span></div>
        <div class="cartoon"><strong>Is a Cartoon?:</strong><span>${character.cartoon}</span></div>
        <div class="weapon"><strong>Weapon:</strong><span>${character.weapon}</span></div>
      </div>`
}

const getPreviousSiblingValue = (elementId) => {
  return document.getElementById(elementId).previousElementSibling.value
}

const getFormData = (form) => {
  const inputs = [...form.getElementsByTagName('input')]
  const inputValues = inputs.map(input => input.checked ? true : input.value)
  if (inputValues.length === 4) {
    return {
      name: inputValues[0],
      occupation: inputValues[1],
      weapon: inputValues[2],
      cartoon: inputValues[3] === 'on' ? false : true
    }
  } else if (inputValues.length === 5) {

    return {
      id: inputValues[0],
      name: inputValues[1],
      occupation: inputValues[2],
      weapon: inputValues[3],
      cartoon: inputValues[4] === 'on' ? false : true
    }
  }
}

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', async function (event) {
    try {
      const response = await charactersAPI.getFullList()
      clearCharactersContainer()
      response.data.forEach(character => insertCharacterToContainer(character, 'characters-container'))
    } catch (err) {
      console.log(err)
    }
  })

  document.getElementById('fetch-one').addEventListener('click', async function (event) {
    try {
      const response = await charactersAPI.getOneRegister(getPreviousSiblingValue(event.target.id))
      clearCharactersContainer()
      insertCharacterToContainer(response.data, 'characters-container')
    } catch (err) {
      console.log(err)
    }
  })

  document.getElementById('delete-one').addEventListener('click', async function (event) {
    try {
      await charactersAPI.deleteOneRegister(getPreviousSiblingValue(event.target.id))
      document.getElementById('delete-one').style.background = 'green'
    } catch (err) {
      document.getElementById('delete-one').style.background = 'red'
      console.log(err)
    }
  })

  document.getElementById('new-character-form').addEventListener('submit', async function (event) {
    event.preventDefault()
    try {
      const character = getFormData(event.target)
      await charactersAPI.createOneRegister(character)
    } catch (error) {
      console.log(error)
    }
  })

  document.getElementById('edit-character-form').addEventListener('submit', async function (event) {
    event.preventDefault()
    try {
      const character = getFormData(event.target)
      await charactersAPI.updateOneRegister(character)
    } catch (error) {
      console.log(error)
    }
  })
})
