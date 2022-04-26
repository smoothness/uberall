import React, { useState, useContext } from 'react'
import {
  Button,
  Flex,
  Heading,
  TextField,
  SelectField,
} from '@aws-amplify/ui-react'
import countryList from 'react-select-country-list'

import { API } from '../../utils/api'
import { ResultsContext } from '../../App'
import './Check.css'

export default function Check() {
  const { setResults, setHasError, setErrorMessage, setLoading } =
    useContext(ResultsContext)
  const [countries, setCountries] = useState(countryList().getData())
  const [formState, setFormState] = React.useState({
    country: '',
    name: '',
    street: '',
    zip: '',
  })

  function renderCountries() {
    return countries.map(({ value, label }) => {
      if (value !== 'US') {
        return (
          <option key={value} value={value}>
            {label}
          </option>
        )
      }
      return (
        <option key={value} value={value}>
          {label}
        </option>
      )
    })
  }

  function handleChange(e) {
    const value = e.target.value
    setFormState({
      ...formState,
      [e.target.name]: value,
    })
  }

  async function handleSubmit() {
    setLoading(true)
    const result = await API.search(formState)
    setLoading(false)

    if (result.status === 'SUCCESS') {
      setResults(result.response.managedLocation.managedListings)
    }

    if (!result.status === 'SUCCESS') {
      setHasError(true)
      setErrorMessage(result.message)
    }
  }

  return (
    <section>
      <Heading level={2} margin="3rem 0">
        Is your company listed accurately in these online directories?
      </Heading>
      <Heading level={4} marginBottom="3rem">
        COMPANY PRESENCE CHECK
      </Heading>
      <div className="checkContainer">
        <Flex
          className="form"
          justifyContent="center"
          alignItems="flex-end"
          wrap="nowrap"
          gap="0.25rem"
        >
          <SelectField
            alignItems="flex-start"
            label="Country"
            name="country"
            onChange={handleChange}
            value={formState.country}
            placeholder="Please select a country"
          >
            {renderCountries()}
          </SelectField>
          <TextField
            alignItems="flex-start"
            label="Company name"
            name="name"
            onChange={handleChange}
            value={formState.companyName}
          />
          <TextField
            alignItems="flex-start"
            label="Street and Number"
            name="street"
            onChange={handleChange}
            value={formState.streetNumber}
          />
          <TextField
            alignItems="flex-start"
            label="ZIP/Postcode"
            name="zip"
            onChange={handleChange}
            value={formState.zip}
          />
          <Button
            backgroundColor="#239fe6"
            className="checkBtn"
            color="white"
            onClick={handleSubmit}
          >
            Check now
          </Button>
        </Flex>
        <Flex justifyContent="center">
          <p>Previous searches:</p>
        </Flex>
      </div>
    </section>
  )
}
