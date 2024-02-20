const util = {
    formatHtml: content => {
        if (!content) {
          return
        }
        content = content.replace(/<p/gi, '<p style="max-width:100% !important;word-wrap:break-word;word-break:break-word;" ')
        content = content.replace(/<img/gi, '<img style="max-width:100% !important;height:auto !important;margin:0;display:flex;" ')
        content = content.replace(/style="/gi, 'style="max-width:100% !important;table-layout:fixed;word-wrap:break-word;word-break:break-word;')
        content = content.replace(/<table/gi, '<table style="table-layout:fixed;word-wrap:break-word;word-break:break-word;" ')
        content = content.replace(/<td/gi, '<td cellspacing="0" cellpadding="0" style="border-width:1px; border-style:solid; border-color:#666; margin: 0px; padding: 0px;"')
        content = content.replace(/width=/gi, 'sss=')
        content = content.replace(/height=/gi, 'sss=')
        content = content.replace(/\/>/gi, ' style="max-width:100% !important;height:auto !important;margin:0;display:block;" />')
        return content
      },
}

export default util