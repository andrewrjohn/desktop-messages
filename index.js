const {
    app,
    BrowserWindow,
    Tray
} = require('electron')

let tray, window

app.dock.hide()

const createWindow = () => {
    window = new BrowserWindow({
        show: false,
        frame: false,
        width: 900,
        height: 420,
        fullscreenable: false,
        resizable: false,
    })

    window.loadURL("https://messages.google.com/web/")

    window.on('blur', () => {
        window.hide()
    })
}

const toggleWindow = () => {
    window.isVisible() ? window.hide() : showWindow()
}

const showWindow = () => {
    const windowBounds = window.getBounds()
    const trayBounds = tray.getBounds()

    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
    const y = Math.round(trayBounds.y + trayBounds.height)

    window.setPosition(x, y, false)
    window.show()
}

const createTray = () => {
    tray = new Tray('message.png')
    tray.on('click', () => {
        toggleWindow()
    })
}

app.on('ready', () => {
    createTray()
    createWindow()
})