import main from './main'
import "./scss/main.scss"

export default (document) => {
  const element = document.getElementById('root')
  main({element})
}
