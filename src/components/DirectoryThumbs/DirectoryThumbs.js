import React from 'react'
import { Flex } from '@aws-amplify/ui-react'

import { directory_logos } from '../../utils/directory_logos'
import './DirectoryThumbs.css'

export default function DirectoryThumbs() {
  function renderThumbs() {
    return Object.entries(directory_logos).map((entry) => {
      let name = entry[0].replaceAll('_', ' ')
      return (
        <div className="directory-entry" key={entry[0]}>
          <span>{name}</span>
          <img src={entry[1]} alt={name} width="48" />
        </div>
      )
    })
  }

  return (
    <section className="directory-thumbs">
      <Flex wrap="wrap" gap="1.5rem" justifyContent="space-between">
        {renderThumbs()}
      </Flex>
    </section>
  )
}
