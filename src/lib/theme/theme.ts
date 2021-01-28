import './theme.css';

window.addEventListener('#theme-toggle', toggle)

if (localStorage.getItem('theme') === 'dark') toggle()

function toggle() {
    const next = getCurrent() === 'dark' ? 'default' : 'dark'
    if(next === 'dark') 
        document.body.classList.add("dark")
    else 
        document.body.classList.remove("dark")
    localStorage.setItem('theme', next)
}

function getCurrent() {
    return document.body.className.includes('dark') ? 'dark' : 'default'
}