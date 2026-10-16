// textos do terminal em russo

export default {
  meta: { name: 'Русский', timeLocale: 'ru-RU' },

  help: `
  запуск: chegou [опции] [файлы, папки или ссылки...]

  примеры:
    chegou                      # открыть и ждать файлы с телефона
    chegou photo.jpg video.mp4  # выложить эти файлы для скачивания на телефоне
    chegou ./photos             # все файлы из папки
    chegou https://mysite.com   # отправить ссылку на телефон
    chegou --relay              # через туннель (работает вне твоего wi-fi)
    chegou --open               # вкл/выкл автооткрытие папки (запоминается)

  опции:
    --relay, --tunnel, -r  туннель Cloudflare: работает из любой сети (до 100 МБ на файл)
    --local, -l            локальная сеть, без вопроса
    --port, -p <число>     желаемый порт (по умолчанию: {port})
    --dir,  -d <путь>      куда сохранять входящие файлы (по умолчанию: ~/Downloads/chegou)
    --timeout, -t <мин>    выключиться после X минут простоя
    --open [on|off]        открыть папку при первом файле: без значения переключает, запоминается (по умолчанию: on)
    --lang <язык>          язык терминала: {langs}
    --help, -h             показать эту справку
`,

  args: {
    needsValue: '{flag}: нужно значение',
    badPort: 'неверный порт: {value} (число от 1 до 65535)',
    badTimeout: 'неверное время: {value} (в минутах, например --timeout 10 или --timeout 0.5)',
    badLang: 'неверный язык: {value} (доступны: {langs})',
    unknown: 'неизвестная опция: {flag}',
    badOpen: 'неверное значение --open: {value} (on или off)',
  },

  errors: {
    prefix: 'ошибка:',
    mkdir: 'не удалось создать папку {dir} ({code})',
    listen: 'не удалось запустить сервер ({reason})',
    noFreePort: 'нет свободного порта между {from} и {to}',
    tunnelNoLan: 'не удалось открыть туннель ({reason}), а локальной сети у компьютера нет',
    tunnelFallback: 'не удалось открыть туннель ({reason}), переключаюсь на локальную сеть',
  },

  prompt: {
    question: 'как подключится телефон?',
    localName: 'локально',
    localHint: 'тот же wi-fi · быстрее · без лимита размера',
    tunnelName: 'туннель',
    tunnelHint: 'любая сеть · через Cloudflare · до 100 МБ на файл',
    noLan: ' нет локальной сети',
    keys: '↑↓ выбрать · enter подтвердить',
  },

  tunnel: {
    downloading: 'скачиваю cloudflared (~30 МБ, только в первый раз)...',
    opening: 'открываю туннель...',
    waiting: 'жду, пока адрес заработает...',
    slow: 'Cloudflare слишком долго не отвечает',
    noUrl: 'Cloudflare не вернул адрес',
    failed: 'не удалось запустить cloudflared',
  },

  banner: {
    tunnelTag: '· туннель',
    waiting: 'жду файлы',
    tunnel: 'туннель',
    network: 'сеть',
    local: 'локально',
    folder: 'папка',
    token: 'токен',
    noNetwork: 'нет wi-fi/кабеля',
    shutsDown: 'выкл.',
    idleFor: 'после {time} простоя',
    tunnelLimit: 'в туннеле до 100 МБ на файл',
    portBusy: 'порт {wanted} занят, беру {port}',
    scanTunnel: 'отсканируй QR · работает из любой сети',
    scan: 'отсканируй QR телефоном',
    connect: 'подключи компьютер к сети, чтобы работать с телефоном',
    drop: 'перетащи файлы сюда или введи ссылку + Enter',
    quit: 'q + enter или ctrl+c — выход',
    activity: 'активность',
  },

  activity: {
    opened: 'папка открыта · chegou --open отключает это',
    shared: '(отправлено)',
    sharedText: '···· отправлено на телефон',
    downloaded: '(скачано на телефоне)',
  },

  share: {
    notFound: 'файл не найден: {path}',
    isFolder: 'это папка: {path}',
    empty: 'пустой текст',
    emptyFolder: 'в папке {name} нет файлов',
    folderLimit: 'в папке {name} файлов: {count}, отправлены только первые {max}',
  },

  upload: {
    fallbackName: 'файл',
    noFreeName: 'не нашлось свободного имени для {name}',
  },

  update: {
    available: 'доступна новая версия',
    run: 'обновить:',
  },
  open: {
    label: 'открывать папку при 1-м файле:',
    on: 'вкл',
    off: 'выкл',
    saved: '(запомнено)',
    notSaved: '(только сейчас, сохранить не удалось)',
  },

  goodbye: {
    idle: 'выключился после простоя ({time})',
    bye: 'до встречи ·',
    nothing: 'файлов не получено',
    files: { one: '{n} файл', few: '{n} файла', many: '{n} файлов', other: '{n} файла' },
    star: 'понравилось? поставь',
  },
}
