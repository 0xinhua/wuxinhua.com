import React, { useState } from 'react'
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-hooks-web'
import Link from 'next/link'
import { ALGOLIA_APP_ID, ALGOLIA_SERACH_API_KEY, INDEX_NAME } from '@/lib/constants'

import 'instantsearch.css/themes/satellite.css'

// If you wanna use algolia search, replace it with your own applications settings in https://www.algolia.com/
const searchClient = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_SERACH_API_KEY,
)

const Hit = ({ hit }) => {
  const { slug, excerpt } = hit;
  return (<div className="flex flex-col text-gray-600 dark:text-gray-400">
    <Link as={`/posts/${slug}`} href="/posts/[slug]" legacyBehavior>
    <a className="hover:underline underline mb-1 text-base">
      <Highlight attribute="title" hit={hit}>
    </Highlight>
    </a>
    </Link>
      <Highlight attribute="excerpt" hit={hit}>
        <span>{excerpt}</span>
      </Highlight>
    </div>
)}

export default function Search() {
  const [visible, setVisible] = useState(false)
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={INDEX_NAME}
    >
    <SearchBox
      placeholder='Search...'
      searchAsYouType
      queryHook={(query, hook) => {
        setVisible(!!query)
        return hook(query)
      }}
    />
    {visible ? <Hits
      hitComponent={Hit}
    /> : null }
  </InstantSearch>
  )
}
