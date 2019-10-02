import React, { useEffect, useState } from 'react'
import {
  Card,
  Heading,
  Button,
  Flex,
  Box,
  Text,
  Image,
  Sidebar,
  Spinner,
} from '../primitives'
import Utils from '../components/Utils'

const Stats = ({ actions, location }) => {
  const cPage = location.pathname

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState()

  useEffect(() => {
    actions
      .getMyStats()
      .then(s => {
        setStats(s)
        setLoading(false)
      })
      .catch(e => {
        setError(e)
        setLoading(false)
      })
  }, [])

  return loading ? (
    <Flex width={1} height="100%" alignItems="center" justifyContent="center">
      <Spinner>/</Spinner>
    </Flex>
  ) : (
    <Flex flexDirection="column" p={4} justifyContent="space-evenly">
      <Heading>My Stats</Heading>
      <Card flexDirection="column">
        {stats ? (
          Object.keys(stats).map(k => {
            if (k === 'position') return null
            return (
              <Flex flexDirection="column" key={k}>
                <Utils.RenderObject.Prop label={`${k}:`} value={stats[k]} />
              </Flex>
            )
          })
        ) : (
          <Text>You have to stats to render.</Text>
        )}
      </Card>
    </Flex>
  )
}

export default Stats
