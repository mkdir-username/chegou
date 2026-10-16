// textos da página do celular em russo
window.CHEGOU_LOCALES = window.CHEGOU_LOCALES || {}
window.CHEGOU_LOCALES.ru = {
  meta: { htmlLang: 'ru' },

  boot: {
    connected: 'подключено к компьютеру',
    ready: '  можно обмениваться файлами',
    connectedTunnel: 'подключено через туннель',
    readyTunnel: '  любая сеть · до 100 МБ',
    hostTunnel: 'qrdrop · туннель',
  },

  sections: {
    fromPc: '# с компьютера',
    toPc: '# отправить на компьютер',
    empty: '  файлов пока нет',
    camera: '# камера → компьютер',
    photoToPc: '# фото → компьютер',
    videoToPc: '# видео → компьютер',
    sending: '# отправка',
    progressLabel: 'прогресс отправки',
  },

  buttons: {
    add: '[ + добавить ]',
    addMore: '[ + добавить ещё ]',
    sendOthers: '[ + отправить ещё ]',
    send: 'отправить',
    sendFiles: 'отправить {files} · {size}',
    sending: 'отправляю...',
    sent: 'отправлено ✓',
    retry: 'повторить',
  },

  sheet: {
    title: '# добавить',
    photo: 'фото',
    photoHint: 'снять сейчас',
    video: 'видео',
    videoHint: 'записать сейчас',
    files: 'файлы',
    filesHint: 'галерея и папки',
    cancel: 'отмена',
  },

  files: { one: '{n} файл', few: '{n} файла', many: '{n} файлов', other: '{n} файла' },
  progress: '  {done} из {total}{speed}',

  done: {
    arrived: {
      one: '✓ {n} файл на компьютере',
      few: '✓ {n} файла на компьютере',
      many: '✓ {n} файлов на компьютере',
      other: '✓ {n} файла на компьютере',
    },
    photo: '✓ фото на компьютере',
    video: '✓ видео на компьютере',
  },

  errors: {
    unauthorized: 'неверный токен · отсканируй QR заново',
    tooLarge: 'файл слишком большой',
    tooLargeTunnel: 'файл больше 100 МБ — лимит туннеля',
    tunnelLimit: 'больше 100 МБ, лимит туннеля: {names} · для них используй локальную сеть',
    http: 'ошибка {status} на компьютере',
    network: 'связь потеряна · qrdrop на компьютере ещё запущен?',
    aborted: 'отправка отменена',
    noToken: '! в адресе нет токена · отсканируй QR в терминале',
  },

  pc: {
    download: '[ скачать ]',
    copy: '[ копировать ]',
    copied: 'скопировано ✓',
    open: '[ открыть ]',
    copyPrompt: 'Скопируй текст ниже:',
    new: '✓ новое с компьютера: {name}',
  },
}
