export class Router {
  routes = {}

  add(routeName, link) {
    this.routes[routeName] = link
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]

    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html

      if(pathname === '/') {
        document.getElementsByTagName('body')[0].classList.remove('bg2', 'bg3')
        document.getElementById('homePage').classList.add('active')
        document.getElementById('universePage').classList.remove('active')
        document.getElementById('explorerPage').classList.remove('active')
      }
      if(pathname === '/universe') {
        document.getElementsByTagName('body')[0].classList.remove('bg3')
        document.getElementsByTagName('body')[0].classList.add('bg2')
        document.getElementById('homePage').classList.remove('active')
        document.getElementById('universePage').classList.add('active')
        document.getElementById('explorerPage').classList.remove('active')
      }
      if(pathname === '/explorer') {
        document.getElementsByTagName('body')[0].classList.remove('bg2')
        document.getElementsByTagName('body')[0].classList.add('bg3')
        document.getElementById('homePage').classList.remove('active')
        document.getElementById('universePage').classList.remove('active')
        document.getElementById('explorerPage').classList.add('active')
      }
    })
  }
}