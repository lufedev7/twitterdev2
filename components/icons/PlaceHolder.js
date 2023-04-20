import React from 'react'
import ContentLoader from 'react-content-loader'

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={404}
    height={480}
    viewBox="0 0 374 480"
    backgroundColor="#fafafa"
    foregroundColor="#e1e0e0"
    {...props}
  >
    <rect x="79" y="40" rx="2" ry="2" width="140" height="10" />
    <rect x="78" y="66" rx="2" ry="2" width="140" height="10" />
    <circle cx="43" cy="55" r="20" />
    <rect x="29" y="98" rx="0" ry="0" width="357" height="313" />
  </ContentLoader>
)

export default MyLoader
