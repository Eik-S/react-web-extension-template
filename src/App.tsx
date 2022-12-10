import { css } from '@emotion/react'
import { useVisitedPages } from './useVisitedPages'

export function App() {
  const { visitedPages } = useVisitedPages()

  return (
    <div css={styles.appStyles}>
      <h1>Visited Pages</h1>
      <ul>
        {visitedPages.map((page) => (
          <li key={page.url}>
            <a href={page.url}>{page.title}</a>
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
