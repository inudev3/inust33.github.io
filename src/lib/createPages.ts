import { CreatePagesArgs } from 'gatsby'
export async function createPages({ actions }: CreatePagesArgs) {
  const { createPage } = actions
  pages.forEach(page => {
    createPage({
      path: page.id.toString(),
      context: page,
      component: './components', // ?,
    })
  })
}
