import { css } from '@emotion/react'
import { useVisitedPages } from './useVisitedPages'

export function App() {
  const { visitedPages, visitPage } = useVisitedPages()

  return (
    <div css={styles.appStyles}>
      <h1>Visited Pages</h1>
      <ul>
        {visitedPages.map((page) => (
          <li key={page.url}>
            <a href="" onClick={() => visitPage(page)}>
              {page.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const styles = {
  appStyles: css`
    width: 400px;
    min-height: 400px;
    padding: 24px;
  `,
}
