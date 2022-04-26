import React, { useState, useContext } from 'react'
import {
  Flex,
  Heading,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Text,
} from '@aws-amplify/ui-react'

import { ResultsContext } from '../../App'
import { directory_logos } from '../../utils/directory_logos'

export default function Results() {
  const { results, setResults, setHasError, setErrorMessage, setLoading } =
    useContext(ResultsContext)

  return (
    <div>
      <Heading level={2} textAlign="center" marginBottom="2rem">
        Is your company listed accurately in these online directories?
      </Heading>
      <Text textAlign="center" marginBottom="2rem">
        Your online business listing visibility
      </Text>
      <Table
        caption="Directory Results"
        highlightOnHover={false}
        size={undefined}
        variation={undefined}
      >
        <TableHead>
          <TableRow>
            <TableCell as="th">Directory</TableCell>
            <TableCell as="th">Connect status</TableCell>
            <TableCell as="th">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results &&
            results.map((result) => (
              <TableRow>
                <TableCell>
                  <Flex alignItems="center">
                    <img src={directory_logos[result.type]} width="32" />
                    <span>{result.type}</span>
                  </Flex>
                </TableCell>
                <TableCell>
                  {result.connectStatus.replaceAll('_', ' ')}
                </TableCell>
                <TableCell>{result.status.replaceAll('_', ' ')}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
