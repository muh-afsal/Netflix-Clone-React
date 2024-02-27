// eslint-disable-next-line no-unused-vars
import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import { requests } from '../Requests'

const Home = () => {
  return (
    <div>
      <Main/>
      <Row rowId="1" title="Up coming" fetchURL={requests.requestUpcoming}/>
      <Row rowId="2" title="Trending" fetchURL={requests.requestTrending}/>
      <Row rowId="3" title="Popular" fetchURL={requests.requestPopular}/>
      <Row rowId="4" title="Top Rated" fetchURL={requests.requestToprated}/>
    </div>
  )
}

export default Home
