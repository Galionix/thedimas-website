// @index('./**/*.json', f => `import ${f.name} from '${f.path}.json'`)
import blog from './blog.json'
import footer from './footer.json'
import header from './header.json'
import main_page from './main_page.json'
import posts from './posts.json'
import projects_page from './projects_page.json'
import projects from './projects.json'
// @endindex
export const staticData = {
// @index('./**/*.json', f => `${f.name},`)
blog,
footer,
header,
main_page,
posts,
projects_page,
projects,
// @endindex
}